<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 16.10.2015
 * Time: 15:46
 */

namespace BYRWEB\app001\couponInspector;


use BYRWEB\base\PaymentObject;

class CouponPayment extends PaymentObject
{

    public function checkPaymentPossibility($amount, $type_ids, CouponObject &$coupon)
    {
        $is_possible = false;
        $total_available_slot = 0;

        foreach ($type_ids as $type_id) {
            $total_available_slot = $total_available_slot + $this->getTotalAvailableSlotByType($type_id);
        }

        $is_possible = $amount <= $total_available_slot;

        if (!$is_possible) {
            if ($coupon->type != 'shopping'
                && $this->hasPreservation()
                && ($this->getPreservedTotal('shopping') + $total_available_slot) >= $amount
            ) {

                $required_amount = $amount - $total_available_slot;
                $is_released = $this->releaseSlotForAmount($required_amount);

                if ($is_released) {
                    return self::checkPaymentPossibility($amount, $type_ids, $coupon);
                }
            }
        }


        if ($is_possible) {
            $this->preservePayment($amount, $type_ids, $coupon);
        }

        return $is_possible;
    }

    public function releasePreservationByCoupon(&$coupon){
        /**
         * @var $split CouponPaymentSplit
         */
        foreach($this->splits as &$split){
            $split->releasePreservationByCoupon($coupon);
        }
    }

    private function releaseSlotForAmount2($required_amount)
    {

        foreach ($this->splits as $split) {
            $preserves = $split->getPreserved();
            foreach ($preserves as $preserve) {
                if ($preserve['amount'] >= $required_amount) {
                    $preserve['amount'] = $preserve['amount'] - $required_amount;
                    return true;
                } else {
                    $required_amount = $required_amount - $preserve['amount'];
                    if ($required_amount > 0) {
                        $preserve['amount'] = 0;
                    } else {
                        return true;
                    }

                }
            }
        }
    }

    private function releaseSlotForAmount($required_amount)
    {
        /**
         * @var $split CouponPaymentSplit
         */

        $is_released = false;
        $remaining = $required_amount;

        foreach ($this->splits as &$split) {

            $remaining = $split->releaseSlotForAmount($remaining);

            if($remaining == 0){
                $is_released = true;
                break;
            }

        }

        return $is_released;
    }

    private function hasPreservation()
    {
        /**
         * @var $split CouponPaymentSplit
         */
        $has_preservation = false;
        foreach ($this->splits as $split) {
            $has_preservation = $split->hasPreservation();
            if ($has_preservation) {
                break;
            }
        }

        return $has_preservation;
    }

    private function getPreservedTotal($type = null)
    {
        /**
         * @var $split CouponPaymentSplit
         */

        $total = 0;
        foreach ($this->splits as $split) {
            $total += $split->getPreservedTotal($type);
        }

        return $total;
    }


    public function preservePayment($amount, $type_ids, &$coupon)
    {
        /**
         * @var $split CouponPaymentSplit
         */
        $remaining = $amount;

        foreach ($type_ids as $type_id) {

            if ($remaining == 0) {
                break;
            }

            foreach ($this->splits as $split) {

                if ($remaining == 0) {
                    break;
                }

                if ($split->getTypeId() == $type_id) {
                    $slot = $split->getAvailableSlot();

                    if ($remaining <= $slot) {
                        $split->addPreservedBy($amount, $coupon);
                        $remaining = 0;
                    } else {
                        $split->addPreservedBy($slot, $coupon);
                        $remaining = $remaining - $slot;
                    }
                }
            }
        }
    }
}