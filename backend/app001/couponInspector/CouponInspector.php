<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 02.09.2015
 * Time: 16:42
 */

namespace BYRWEB\app001\couponInspector;

use BYRWEB\app001\client\ClientRecord;
use BYRWEB\app001\saleitem\SaleitemRecord;
use BYRWEB\base\Money;
use BYRWEB\base\SlimRouteProvider;
use BYRWEB\base\WTDate;
use BYRWEB\base\DateFunction;
use BYRWEB\base\WTDbUtils;
use BYRWEB\lup\type\Type;


class CouponInspector implements SlimRouteProvider
{
    /**
     * @var \PDO
     */
    public static $db;

    private static $postData;

    /**
     * @var CouponPayment
     */
    private static $payment;

    /**
     * @var CouponObject[]
     */
    private static $filteredCoupons = [];

    public static function initRoutes($app, $db)
    {


        $app->group('/app001/coupon/couponInspector', function () use ($app, $db) {

            CouponInspector::$db = $db;

            $app->post('', function () use ($app) {
                $post = json_decode(file_get_contents("php://input"), true);

                if (array_key_exists('client_id', $post)) {
                    $client = new ClientRecord();
                    $client->setDb(self::$db);
                    $client->setPrimaryValue($post['client_id']);
                    $client->load();
                    $post['client'] = $client;
                }

                if (!array_key_exists('client', $post) || empty($post['client'])) {
                    $post['total'] = CouponInspector::calculateTotals($post['saleItems']);
                    echo json_encode($post);

                    return;
                }

                CouponInspector::setPostData($post);
                echo json_encode(CouponInspector::getCoupons());
            });


        });

    }

    private static function calculateTotals(&$sale_items)
    {
        $total = [
            'price' => 0,
            'tax'   => 0,
            'grand' => 0,
        ];
        foreach ($sale_items as &$sale_item) {
            if (array_key_exists('exempt', $sale_item)) {
                continue;
            }
            $total['price'] = $total['price'] + $sale_item['qty'] * $sale_item['saleitem']['base_price'];
            $total['tax']   = $total['tax'] + $sale_item['qty'] * $sale_item['saleitem']['tax'];
            $total['grand'] = $total['grand'] + $sale_item['qty'] * $sale_item['saleitem']['taxed_price'];
        }

        return $total;
    }

    public static function getCoupons()
    {

        /**
         * this will analyze and preapre the coupons
         */
        CouponInspector::analyze();

        /**
         * this will calculate the new totals after coupons have been issued.
         */
        CouponInspector::extract();
        CouponProcessor::process();
        CouponInspector::fixExcessivePayment();

        $returnObj          = new \stdClass();
        $returnObj->coupons = CouponInspector::getApplicableCoupons();

        /**
         * get the totals if there are any coupon applicable
         */
        if (count($returnObj->coupons) > 0) {
            $returnObj->new_total = CouponProcessor::$newTotal;
        } /**
         * if not, return the original totals, also make sure discount is zeroed out.
         */
        else {
            $returnObj->new_total             = self::$postData['total'];
            $returnObj->new_total['discount'] = 0;
        }
        $returnObj->saleitems = self::$postData['saleItems'];
        $returnObj->total     = self::$postData['total'];
        $returnObj->new_total = self::getDiscountTotalsApplied($returnObj->new_total, 'new');
        $returnObj->total     = self::getDiscountTotalsApplied($returnObj->total, 'original');
        $returnObj->points    = [
            'shopping' => CouponProcessor::getTotalPoint('shopping'),
            'saleitem' => CouponProcessor::getTotalPoint('saleitem'),
        ];

        return $returnObj;
    }

    public static function analyze()
    {
        if (count(CouponInspector::$postData['saleItems']) == 0) {
            return;
        }

        $coupon_ids = self::filterCouponsByTarget();

        CouponInspector::$payment = new CouponPayment();

        CouponInspector::importPaymentSplits(CouponInspector::$postData);

        CouponInspector::loadFilteredCoupons(explode(',', $coupon_ids));

        CouponInspector::analyzeCoupons();
        CouponInspector::analyzeBestPointCoupon();
    }

    private static function filterCouponsByTarget()
    {

        $sql = "SELECT
	GROUP_CONCAT(
		DISTINCT c.coupon_id
		ORDER BY
			c.coupon_id ASC SEPARATOR ','
	) AS coupon_ids
FROM
	coupon AS c
LEFT JOIN coupon_target AS ct ON ct.coupon_id = c.coupon_id
LEFT JOIN coupon_target_group AS ctg ON ctg.coupon_target_id = ct.coupon_target_id
LEFT JOIN client_group AS cg ON cg.client_group_id = ctg.client_group_id
LEFT JOIN card AS crd ON crd.type_id = ctg.card_type_id
LEFT JOIN client_card AS cc ON cc.card_id = crd.card_id
LEFT JOIN type AS t ON t.type_id = ct.type_id
LEFT JOIN type AS st ON st.type_id = c.status_id
LEFT JOIN type AS card_type ON card_type.type_id = crd.type_id
WHERE
	st. NAME = 'published' and c.enterprise_id={$_SESSION['user']->enterprise_id}
OR (card_type.`name` = 'promotion') AND (t.name='everyone' OR cg.client_id=" . CouponInspector::$postData['client_id'] . ") ";


        $sth = CouponInspector::$db->query($sql);

        if ($sth->errorCode() !== '00000') {
            error_log(implode('|', $sth->errorInfo()));
        }

        $row = $sth->fetch(\PDO::FETCH_ASSOC);


        return $row['coupon_ids'];

    }

    private static function importPaymentSplits($postData)
    {

        if (count($postData['payment_splits']) == 0
            && array_key_exists('default_payment_type_id', $postData)
            && $postData['default_payment_type_id'] != null
        ) {
            $split         = new CouponPaymentSplit();
            $split->amount = $postData['total']['grand'];
            $split->setTypeId($postData['default_payment_type_id']);
            CouponInspector::$payment->addSplit($split);
        } else {

            foreach ($postData['payment_splits'] as $_split) {
                $split         = new CouponPaymentSplit();
                $split->amount = $_split['payment'];

                /**
                 * kupon process isleminden split içindeki payment_type_id
                 * farklı sekiillerde geldigi için burada kontrol koyduk.
                 */
                if (array_key_exists('payment_type_id', $_split)) {
                    $split->setTypeId($_split['payment_type_id']);
                } else if (array_key_exists('payment_type', $_split) && is_array($_split['payment_type'])) {
                    $split->setTypeId($_split['payment_type']['type_id']);
                } else {
                    return;
                }
                CouponInspector::$payment->addSplit($split);
            }
        }
    }

    private static function loadFilteredCoupons($coupon_ids)
    {
        for ($i = 0; $i < count($coupon_ids); $i++) {

            $coupon_id = $coupon_ids[ $i ];

            $couponObj = new CouponObject(
                $coupon_id,
                CouponInspector::$postData['client'],
                CouponInspector::$postData['saleItems'],
                CouponInspector::$postData['total']);

            $couponObj->setDefaultPaymentTypeId(CouponInspector::$postData['default_payment_type_id']);
            $couponObj->setPayment(CouponInspector::$payment);
            $couponObj->load();
            CouponInspector::$filteredCoupons[] = $couponObj;
        }
    }

    private static function analyzeCoupons()
    {
        if (DEBUG) {
            $CI_postData =& CouponInspector::$postData;
        }


        $last_analyzed_coupon_type = null;

        while (list($key, $coupon) = each(CouponInspector::$filteredCoupons)) {
            /* @var $coupon CouponObject */

            $is_analyzed = false;
            if (!$coupon->is_analyzed || $coupon->type == 'shopping') {
                $coupon->analyze();
                $is_analyzed = true;
            }

            if ($coupon->type != 'shopping'
                && $last_analyzed_coupon_type == 'shopping'
                && $is_analyzed == true
                && $coupon->isApplicable()
            ) {
                CouponInspector::freeShoppingCouponPreservations();
                /**
                 * reset the foreach-loop to start over
                 */
                reset(CouponInspector::$filteredCoupons);

            }

            if ($is_analyzed) {
                $last_analyzed_coupon_type = $coupon->type;
            }
        }
    }

    private static function freeShoppingCouponPreservations()
    {
        /**
         * @var $coupon CouponObject
         */
        foreach (self::$filteredCoupons as &$coupon) {
            if (!$coupon->isApplicable() || $coupon->type !== 'shopping') {
                continue;
            }

            $coupon->releasePaymentPreservation();
        }
    }

    private static function analyzeBestPointCoupon()
    {

        $max_point = 0;
        /**
         * @var $best_coupon CouponObject
         */
        $best_coupon = null;
        foreach (CouponInspector::$filteredCoupons as $coupon) { // checkpoint &

            /**
             * @var $coupon CouponObject
             */
            if (!$coupon->isApplicable() || $coupon->type !== 'shopping') {
                continue;
            }

            $point = $coupon->getBestRewardPoint();

            if ($point > $max_point) {
                $max_point = $point;
                if ($best_coupon !== null) {
                    $best_coupon->setUnapplicable();
                }
                $best_coupon = $coupon; // checkpoint &
            } else {
                /**
                 * if the coupon is a discount coupon,
                 * we expect the point to be a "null" value.
                 * in this case, we can ignore this coupon.
                 */
                if ($point !== null) {
                    $coupon->setUnapplicable();
                }
            }
        }
    }

    public static function extract()
    {
        /**
         * will look for the scope of the brand,
         * if not brand then will skip it
         */
        foreach (self::$filteredCoupons as &$coupon) {
            if ($coupon->type != 'brand') {
//            if (!in_array($coupon->type, ['brand', 'saleitem_group'])) {
                continue;
            }
            foreach ($coupon->subjects as $subject) {

                if (Type::getBy([
                    'name'    => 'saleitem',
                    'type_id' => $subject->target_scope_type_id])
                ) {
                    $coupon->scope_target = 'saleitem';
                }


                if (Type::getBy([
                    'name'    => 'shopping',
                    'type_id' => $subject->target_scope_type_id,
                ])
                ) {
                    $coupon->scope_target = 'shopping';
                }

            }
        }
    }

    public static function fixExcessivePayment()
    {

    }

    private static function getApplicableCoupons()
    {
        /**
         * kuponlara ait birden fazla reward ve requirement degerleri için array sekliinde reward ve requiirement
         * arrayleri olusturulacak
         */
        $coupons = [];

        foreach (CouponInspector::$filteredCoupons as $_coupon) {
            /**
             * @var $_coupon CouponObject
             */

            if (!$_coupon->isApplicable()) {
                continue;
            }

            $coupon                 = CouponInspector::getCouponById($_coupon->getCouponId());
            $coupon['rewards']      = $_coupon->rewards;
            $coupon['requirements'] = $_coupon->requirements;

            $coupons[] = $coupon;

        }


        return $coupons;
    }

    private static function getCouponById($coupon_id)
    {
        $sql = "SELECT
c.title,
c.description,
c.coupon_id,
c.`code`,
c.enterprise_id,
c.branch_id
from
coupon AS c
WHERE c.coupon_id=$coupon_id";

        $sth = CouponInspector::$db->query($sql);

        if ($sth->errorCode() !== '00000') {
            error_log(implode('|', $sth->errorInfo()));
        }


        $row = $sth->fetch(\PDO::FETCH_ASSOC);

        return $row;

    }

    private static function getDiscountTotalsApplied($total, $type)
    {

        foreach (self::$postData['saleItems'] as $saleitem) {

            if (!array_key_exists('exempt', $saleitem)) {
                continue;
            }
            if ($type == 'new') {
                $total['price']    = $total['price'] + $saleitem['newPrice']['basePrice'];
                $total['tax']      = $total['tax'] + ($saleitem['newPrice']['tax'] * $saleitem['qty']);
                $total['grand']    = $total['grand'] + ($saleitem['newPrice']['taxedPrice'] * $saleitem['qty']);
                $total['discount'] = $total['discount'] + ($saleitem['newPrice']['discount'] * $saleitem['qty']);
            }
            if ($type == 'original') {

                $total['price'] = $total['price'] + ($saleitem['saleitem']['base_price'] * $saleitem['qty']);
                $total['tax']   = $total['tax'] + ($saleitem['saleitem']['tax'] * $saleitem['qty']);
                $total['grand'] = $total['grand'] + ($saleitem['saleitem']['taxed_price'] * $saleitem['qty']);

            }

        }

        return $total;
    }

    public static function &getPostData()
    {
        return CouponInspector::$postData;
    }

    public static function setPostData(&$post)
    {
        $post                      = CouponInspector::preparePostData($post);
        $post['total']             = CouponInspector::calculateTotals($post['saleItems']);
        CouponInspector::$postData =& $post;
    }

    public static function &getPayment()
    {
        return CouponInspector::$payment;
    }

    public static function getShoppingCoupons()
    {
        /**
         * kuponlara ait birden fazla reward ve requirement degerleri için array sekliinde reward ve requiirement
         * arrayleri olusturulacak
         */
        $coupons = [];
        $ctr     = 0;

        foreach (CouponInspector::$filteredCoupons as &$_coupon) {
            /**
             * @var $_coupon CouponObject
             */

            if (!$_coupon->isApplicable()) {
                continue;
            }

            if ($_coupon->type != 'shopping') {
                continue;
            }

            foreach ($_coupon->rewards as $reward) {
                if ($ctr == 0) {
                    $first_type = $reward->reward_type;
                    $ctr++;
                    $coupons[] =& $_coupon;

                }
                if ($first_type != 'discount' && $ctr < 0 && $reward->reward_type == 'discount') {
                    $coupons   = [];
                    $coupons[] =& $_coupon;
                }
            }
        }

        return $coupons;
    }


    public static function getBrandTotal($brand_id)
    {

        $brand_totals = 0;

        foreach (CouponInspector::$filteredCoupons as &$_coupon) {
            /**
             * @var $_coupon CouponObject
             */

            if (!$_coupon->isApplicable()) {
                continue;
            }

            if ($_coupon->type != 'brand') {
                continue;
            }

            $sale_items = $_coupon->getSaleitems();

            foreach ($sale_items as $sale_item) {

                if (!array_key_exists('has_coupon', $sale_item)) {
                    continue;
                }

                if ($sale_item['coupon_id'] != $_coupon->getCouponId()) {
                    continue;
                }

                if ($sale_item['saleitem']['brand_id'] != $brand_id) {
                    continue;
                }

                $brand_totals = $brand_totals + $sale_item['saleitem']['base_price'];

            }

        }

        return $brand_totals;
    }


    public static function getShoppingTotal()
    {
        $shopping_totals = 0;

        foreach (CouponInspector::$filteredCoupons as &$_coupon) {
            /**
             * @var $_coupon CouponObject
             */

            if (!$_coupon->isApplicable()) {
                continue;
            }

            if ($_coupon->type != 'shopping') {
                continue;
            }

            $saleitems = $_coupon->getSaleitems();

            foreach ($saleitems as $saleitem) {

                if (array_key_exists('has_coupon', $saleitem)) {
                    continue;
                }

                $shopping_totals = $shopping_totals + $saleitem['saleitem']['base_price'];

            }

        }

        return $shopping_totals;
    }

    public static function getCartItemById($saleitem_id)
    {
        foreach (self::$postData['sale_items'] as $item) {
            if ($item['saleitem_id'] == $saleitem_id) {
                return $item;
            }
        }

        return null;
    }

    private static function preparePostData(&$postData)
    {
        for ($i = 0; count($postData['saleItems']) > $i; $i++) {
            /**
             * coupon_id 0 'la
             */
            if (array_key_exists('coupon', $postData['saleItems'][ $i ])) {

                $postData['saleItems'][ $i ]['has_coupon'] = null;
                $postData['saleItems'][ $i ]['coupon']     = null;
                $postData['saleItems'][ $i ]['new_price']  = null;
                unset($postData['saleItems'][ $i ]['has_coupon']);
                unset($postData['saleItems'][ $i ]['coupon']);
                unset($postData['saleItems'][ $i ]['new_price']);


            }
            if (array_key_exists('newPrice', $postData['saleItems'][ $i ])) {
                $postData['saleItems'][ $i ]['exempt']    = true;
                $postData['saleItems'][ $i ]['new_price'] = null;
                unset($postData['saleItems'][ $i ]['new_price']);
            }

//            $sir = new SaleitemRecord();
//            $sir->setDb(WTDbUtils::$db);
//            $sir->setPrimaryValue($postData['saleItems'][ $i ]['saleitem_id']);
//            $sir->load();
//            $postData['saleItems'][ $i ]['saleitem'] = $sir;
        }


        return $postData;
    }
}
