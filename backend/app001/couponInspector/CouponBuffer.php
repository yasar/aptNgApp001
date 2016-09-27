<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 14.10.2015
 * Time: 13:01
 */

namespace BYRWEB\app001\couponInspector;


class CouponBuffer
{
    private $buffer;

    /**
     * @var CouponObject
     */
    private $couponObj;

    public function __construct(&$coupon)
    {
        $this->couponObj =& $coupon; // checkpoint &
        $this->buffer = array(
            'items' => array(),
            'shopping' => array()
        );
    }

    public function reset()
    {
        $this->buffer['items'] = array();
        $this->buffer['shopping'] = array();
    }

    public function assignCouponToSaleItems()
    {

        if (DEBUG) {
            $CI_postData =& CouponInspector::getPostData();
        }

        foreach ($this->buffer['items'] as &$saleitem) {
            $saleitem['has_coupon'] = true; //?
            $saleitem['coupon_id'] = $this->couponObj->getCouponId();
            $saleitem['coupon'] =& $this->couponObj; //?
        }
    }

    public function add(&$saleitem) // checkpoint &
    {

        if (array_key_exists('has_coupon', $saleitem) && $saleitem['has_coupon'] ) {
            return;
        }

        if (DEBUG) {
            $CI_postData =& CouponInspector::getPostData();
            $saleitem['__x'] = 151234;
        }

        /**
         * add by reference
         */
        $this->buffer['items'][] =& $saleitem;
    }

    public function addShopping(&$saleitem) // checkpoint &
    {
        if (array_key_exists('has_coupon', $saleitem) && $saleitem['has_coupon']) {
            return;
        }

        if (DEBUG) {
            $CI_postData =& CouponInspector::getPostData();
            $saleitem['__x'] = 151234;
        }

        $this->buffer['shopping'][] = $saleitem; // checkpoint &
    }

    public function checkRequirementPayment($requirement)
    {
        if($requirement->coupon_subject_id == null){
            /**
             * todo: spend some time to make sure we should return true here !
             * this is a case when there is no subject is assigned to the coupon
             */
            return true;
        }

        $return = null;
        $subject = $this->couponObj->getSubjectById($requirement->coupon_subject_id);

        switch ($subject->type) {
            case 'saleitem':
                /**
                 * since this coupon is all about a specific saleitem,
                 * we can assume that this coupon should be good for this saleitem.
                 * no need to check anything.
                 */
                $return = true;
                break;
            case 'saleitem_group':
            case 'brand':
                $return = ($requirement->amount <= $this->getTotalPrice('items'));
                break;

            case 'shopping':
                $return = ($requirement->amount <= $this->getTotalPrice('shopping'));
                break;
        }

        return $return;
    }

    /**
     * @param $buffer_type
     * @return int
     */
    public function getTotalPrice($buffer_type)
    {
        $total = 0;
        foreach ($this->buffer[$buffer_type] as $saleitem) {
            $total += $saleitem['saleitem']['taxed_price'] * $saleitem['qty'];
        }
        return $total;
    }

    public function checkRequirementQuantity($requirement)
    {
        $return = null;

        $qty_total = $this->getQtyTotal();
        $return = ($qty_total >= ($requirement->amount*1));

        return $return;
    }

    private function getQtyTotal()
    {
        $total = 0;

        foreach ($this->buffer['items'] as $saleitem) {
            $total = $total + $saleitem['qty'];
        }

        return $total;
    }


}