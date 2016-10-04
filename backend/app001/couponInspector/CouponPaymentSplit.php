<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 16.10.2015
 * Time: 15:50
 */

namespace BYRWEB\app001\couponInspector;


use BYRWEB\base\PaymentSplit;

class CouponPaymentSplit extends PaymentSplit
{
    private $preservedBy = array();

    public function addPreservedBy($amount, CouponObject &$coupon)
    {

        $this->preservedBy[] = array(
            'amount' => $amount,
            'coupon' => $coupon);

    }

    public function hasPreservation(){
        return count($this->preservedBy) > 0;
    }

    public function getPreservedTotal($type=null)
    {
        $total = 0;
        foreach ($this->preservedBy as $p) {

            if(null!=$type && $p['coupon']->type!=$type){
                continue;
            }

            $total = $total + $p['amount'];
        }
        return $total;
    }

    public function getAvailableSlot()
    {
        return $this->amount - $this->getPreservedTotal();
    }

    public function getPreserved(){
        return $this->preservedBy;
    }

    public function releasePreservationByCoupon($coupon){
        foreach($this->preservedBy as &$preserve){

            if(! array_key_exists('coupon', $preserve)){
                 return;
            }

            if($preserve['coupon']->getCouponId() == $coupon->getCouponId()){
                $preserve['amount'] = 0;
                $preserve['coupon']->is_analyzed = false; // referans ile bağlı olması lazım
                unset($preserve['coupon']);
            }
        }
    }

    public function releaseSlotForAmount($required_amount){

        $remaining = $required_amount;

        foreach ($this->preservedBy as &$preserve) {

            if ($preserve['amount'] >= $remaining) {
                $remaining = 0;
            } else {
                $remaining = $remaining - $preserve['amount'];
            }

            $preserve['amount'] = 0;
            $preserve['coupon']->is_analyzed = false; // referans ile bağlı olması lazım
//            $preserve['coupon'] = null;
            unset($preserve['coupon']);

            if($remaining ==0){
                break;
            }
        }

        return $remaining;
    }
}