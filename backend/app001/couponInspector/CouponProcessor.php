<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 22.10.2015
 * Time: 12:11
 */

namespace BYRWEB\app001\couponInspector;


use BYRWEB\app001\couponReward\CouponRewardRecord;

class CouponProcessor
{

    public static $newTotal = array(
        'price' => 0,
        'tax' => 0,
        'grand' => 0,
        'discount' => 0
    );
    public static $totalPoints = 0;
    private static $points = array();
    private static $shopping_total = 0;
    private static $brand_total = 0;

    public static function process()
    {
        $postData = &CouponInspector::getPostData();

        $shopping_coupons = CouponInspector::getShoppingCoupons();

        $sale_items =& $postData['saleItems'];


        self::$shopping_total = CouponInspector::getShoppingTotal();


        foreach ($sale_items as &$sale_item) {

            if (array_key_exists('exempt', $sale_item)) {
                continue;
            }
            if (!array_key_exists('has_coupon', $sale_item)) {
                if (count($shopping_coupons) > 0) {
                    self::processShoppingCoupons($sale_item, $shopping_coupons);
                } else {
                    self::addToNewTotal(array(
                        'base_price' => $sale_item['saleitem']['base_price'],
                        'tax' => $sale_item['saleitem']['tax'],
                        'taxed_price' => $sale_item['saleitem']['taxed_price'],
                        'discount' => 0
                    ));
                }
            } else {
                if ($sale_item['coupon']->type == 'brand') {
                    self::$brand_total = CouponInspector::getBrandTotal($sale_item['saleitem']['brand_id']);
                }
                self::processSaleitemCoupon($sale_item);
            }
        }
    }


    public static function processShoppingCoupons(&$saleitem, &$shopping_coupons)
    {
        foreach ($shopping_coupons as &$coupon) {

            foreach ($coupon->rewards as $reward) {
                if ($coupon->is_processed) {
                    self::calculateNewTotalForPointType($saleitem);

                    continue;
                }


                switch ($reward->reward_type) {
                    case 'discount':
                        self::calculateDiscountShopping($saleitem, $reward);
                        break;
                    case 'point':
                        self::calculateNewTotalForPointType($saleitem);
                        self::calculatePointShopping($reward);
                        $coupon->is_processed = true;
                        break;
                }

            }
        }
    }

    private static function calculateNewTotalForPointType(&$sale_item)
    {
        self::$newTotal = array(
            'price' => self::$newTotal['price'] + $sale_item['saleitem']['base_price'] * $sale_item['qty'],
            'tax' => self::$newTotal['tax'] + $sale_item['saleitem']['tax'] * $sale_item['qty'],
            'grand' => self::$newTotal['grand'] + $sale_item['saleitem']['taxed_price'] * $sale_item['qty'],
            'discount' => 0
        );
    }

    private static function calculateDiscountShopping(&$saleitem, $reward)
    {

        $new_price = array(
            'base_price' => 0,
            'tax' => 0,
            'taxed_price' => 0,
            'discount' => 0
        );

        if ($reward->is_percentage == 1) {
            $new_price = self::calculateNewSaleitemPrice($saleitem, $reward->amount);
            $saleitem['new_price'] = $new_price;

        } else {
            $reward_amount = self::getRewardAmountPercentage($reward->amount);
            $new_price = self::calculateNewSaleitemPrice($saleitem, $reward_amount);
            $saleitem['new_price'] = $new_price;

        }

    }

    private static function calculateNewSaleitemPrice(&$saleitem, $reward_amount)
    {
        $new_price['base_price'] = $saleitem['saleitem']['base_price'] -
            ($saleitem['saleitem']['base_price'] * $reward_amount) / 100;

        $new_price['taxed_price'] = $new_price['base_price'] +
            $new_price['base_price'] * $saleitem['saleitem']['tax_percentage'] / 100;

        $new_price['tax'] = $new_price['taxed_price'] - $new_price['base_price'];
        $new_price['discount'] = $saleitem['saleitem']['base_price'] - $new_price['base_price'];

        self::addToNewTotal($new_price);

        return $new_price;

    }

    public static function addToNewTotal($new_price)
    {

        self::$newTotal['price'] += $new_price['base_price'];
        self::$newTotal['tax'] += $new_price['tax'];
        self::$newTotal['grand'] += $new_price['taxed_price'];
        self::$newTotal['discount'] += $new_price['discount'];
    }

    public static function getRewardAmountPercentage($reward_amount)
    {
        $total_shopping = 0;

        if (self::$shopping_total != 0) {
            $total_shopping = self::$shopping_total;
        }

        if (self::$brand_total != 0) {
            $total_shopping = self::$brand_total;
        }


        return $reward_amount = (100 * $reward_amount) / $total_shopping;


    }

    public static function calculatePointShopping(CouponRewardRecord $reward)
    {
        if ($reward->is_percentage == 1) {
            self::$totalPoints = self::$totalPoints + (self::$shopping_total * $reward->amount) / 100;
        } else {

            self::$totalPoints = self::$totalPoints + $reward->amount;
        }
        self::addPoint('shopping', self::$totalPoints, $reward->coupon_id);
    }

    private static function addPoint($type, $point, $coupon_id)
    {
        self::$points[$type][] = array(
            'point' => $point,
            'coupon_id' => $coupon_id
        );

    }

    public static function processSaleitemCoupon(&$sale_item)
    {
        $coupon_type = $sale_item['coupon']->type;

        switch ($coupon_type) {
            case 'saleitem':
                self::calculateForSaleitem($sale_item);
                break;
            case 'brand':
                self::calculateForBrand($sale_item);
                break;
        }

    }

    public static function calculateForSaleitem(&$saleitem)
    {
        $rewards = $saleitem['coupon']->rewards;
        foreach ($rewards as $reward) {
            $reward_type = $reward->reward_type;
            switch ($reward_type) {
                case 'discount':
                    self::calculateDiscountSaleitem($saleitem, $reward);
                    break;
                case 'point':
                    self::calculateSaleitemPoint($saleitem, $reward);
                    self::calculateNewTotalForPointType($saleitem);
                    break;
            }
        }

    }

    private static function calculateDiscountSaleitem(&$saleitem, $reward)
    {
        $new_price = array(
            'base_price' => 0,
            'tax' => 0,
            'taxed_price' => 0,
            'discount' => 0
        );

        if ($reward->is_percentage == 1) {
            $new_price = self::calculateNewSaleitemPrice($saleitem, $reward->amount);
        } else {
            $reward_amount = (100 * $reward->amount) / $saleitem['saleitem']['base_price'];
            $new_price = self::calculateNewSaleitemPrice($saleitem['saleitem'], $reward_amount);
        }
        $saleitem['new_price'] = $new_price;
    }

    public static function calculateSaleitemPoint(&$saleitem, $reward)
    {
        if ($reward->is_percentage == 1) {
            $point = ($reward->amount * ($saleitem['saleitem']['base_price'] * $saleitem['qty'])) / 100;
        } else {
            $point = $reward->amount * $saleitem['qty'];
        }
        $saleitem['point'] = $point;
        self::addPoint('saleitem', $point, $reward->coupon_id);
    }

    public static function calculateForBrand(&$sale_item)
    {
        $rewards = $sale_item['coupon']->rewards;
        foreach ($rewards as $reward) {

            $reward_type = $reward->reward_type;
            switch ($reward_type) {
                case 'discount':
                    self::calculateDiscountBrand($sale_item, $reward);
                    break;
                case 'point':
                    self::calculateNewTotalForPointType($sale_item);
                    self::calculatePointBrand($sale_item, $reward);
                    break;
            }
        }
    }

    private static function calculateDiscountBrand(&$saleitem, $reward)
    {
        $new_price = array(
            'base_price' => 0,
            'tax' => 0,
            'taxed_price' => 0,
            'discount' => 0
        );

        if ($reward->is_percentage == 1) {
            $new_price = self::calculateNewSaleitemPrice($saleitem, $reward->amount);
            $saleitem['new_price'] = $new_price;

        } else {
            $reward_amount = self::getRewardAmountPercentage($reward->amount);
            $new_price = self::calculateNewSaleitemPrice($saleitem, $reward_amount);
            $saleitem['new_price'] = $new_price;

        }


    }

    private static function calculatePointBrand(&$saleitem, $reward)
    {
        if ($saleitem['coupon']->is_processed) {
            return;
        }
        if ($saleitem['coupon']->scope_target == 'shopping') {
            self::calculatePointBrandToShopping($reward);
            $saleitem['coupon']->is_processed = true;
        }

        if ($saleitem['coupon']->scope_target == 'saleitem') {
            self::calculateSaleitemPoint($saleitem, $reward);
        }
    }

    private static function calculatePointBrandToShopping($reward)
    {

        if ($reward->is_percentage == 1) {
            $point = $reward->amount * self::$brand_total / 100;
            self::addPoint('shopping', $point, $reward->coupon_id);
        } else {
            $point = $reward->amount;
            self::addPoint('shopping', $point, $reward->coupon_id);
        }
    }

    public static function getTotalPoint($point_type)
    {
        $types = array('saleitem', 'shopping');
        $total = 0;

        foreach ($types as $type) {

            if (!array_key_exists($point_type, self::$points)) {
                continue;
            }

            if ($type != $point_type) {
                continue;
            }
            foreach (self::$points[$type] as $data) {
                $total += $data['point'];
            }
        }
        return $total;
    }

    public static function getPoints($type)
    {
        if (!array_key_exists($type, self::$points)) {
            return array();
        } else {
            return self::$points[$type];
        }
    }


}