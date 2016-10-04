<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 13.10.2015
 * Time: 15:51
 */

namespace BYRWEB\app001\couponInspector;


use BYRWEB\app001\card\Card;
use BYRWEB\app001\client\ClientRecord;
use BYRWEB\app001\couponCondition\CouponCondition;
use BYRWEB\app001\couponCondition\CouponConditionRecord;
use BYRWEB\app001\couponRequirement\CouponRequirement;
use BYRWEB\app001\couponRequirement\CouponRequirementRecord;
use BYRWEB\app001\couponReward\CouponReward;
use BYRWEB\app001\couponReward\CouponRewardRecord;
use BYRWEB\app001\couponSubject\CouponSubject;
use BYRWEB\app001\couponSubject\CouponSubjectRecord;
use BYRWEB\app001\couponTarget\CouponTarget;
use BYRWEB\app001\couponTarget\CouponTargetRecord;
use BYRWEB\app001\couponTargetGroup\CouponTargetGroup;
use BYRWEB\app999\person\Person;
use BYRWEB\base\DateFunction;
use BYRWEB\base\WTDate;

class CouponObject
{
    /**
     * @var CouponRewardRecord[]
     */
    public $rewards;
    /**
     * @var CouponConditionRecord[]
     */
    public $conditions;
    /**
     * @var CouponSubjectRecord[]
     */
    public $subjects;
    /**
     * @var CouponRequirementRecord[]
     */
    public $requirements;
    /**
     * @var CouponTargetRecord[]
     */
    public $targets;

    public  $is_analyzed               = false;
    public  $is_processed              = false;
    public  $type;
    public  $scope_target;
    private $saleitems, $total, $client;
    private $coupon_id, $is_applicable = true;
    private $default_payment_type_id;
    /**
     * @var CouponBuffer
     */
    private $buffer;

    /**
     * @var CouponPayment
     */
    private $payment;


    public function __construct($coupon_id, ClientRecord $client, &$saleitems_ref, $total)
    {
        if (DEBUG) {
            $CI_postData               =& CouponInspector::getPostData();
            $saleitems_ref['0']['__x'] = 7001;
        }

        $this->coupon_id = $coupon_id;
        $this->client    = $client;
        $this->saleitems =& $saleitems_ref;
        $this->total     = $total;

        if (DEBUG) {
            $this->saleitems['0']['__y'] = 1001;
        }

        $this->buffer = new CouponBuffer($this);
    }

    public function setPayment(CouponPayment &$payment)
    {
        $this->payment = $payment;
    }

    public function analyze()
    {
        if (DEBUG) {
            $CI_postData =& CouponInspector::getPostData();
        }

        if (count($this->subjects) == 0) {
            $this->is_analyzed   = true;
            $this->is_applicable = false;

            return;
        }

        $today = new WTDate();

        if ($this->is_analyzed) {
            $this->buffer->reset();
        }
        $this->type = $this->subjects[0]->type;

        $this->isApplicable() && $this->checkByCondition($today);
        $this->isApplicable() && $this->checkBySubject();
        $this->isApplicable() && $this->checkByRequirement();
        $this->isApplicable() && $this->checkByTarget();
        $this->isApplicable() && $this->assign();

        $this->is_analyzed = true;
    }

    /**
     * Returns the is_applicable flag
     *
     * @return bool
     */
    public function isApplicable()
    {
        return $this->is_applicable;
    }

    public function checkByTarget()
    {
        $is_applicable = false;

        foreach ($this->targets as $target) {

            switch ($target->target) {
                case 'card_type':

                    $cards = Card::getBy(['client_id' => $this->client->client_id, 'is_primary' => 1], false);

                    foreach ($cards as $card) {

                        if ($card->name == $target->group) {
                            $is_applicable = true;
                            continue;
                        }
                    }

                    break;

                default:
                    $is_applicable = true;
                    break;
            }

        }

        return $this->is_applicable = $is_applicable;

    }

    public function checkByCondition(WTDate $date)
    {
        $compare = function ($var1, $op, $var2) {

            switch ($op) {
                case "=":
                    return $var1 == $var2;
                case "!=":
                    return $var1 != $var2;
                case ">=":
                    return $var1 >= $var2;
                case "<=":
                    return $var1 <= $var2;
                case ">":
                    return $var1 > $var2;
                case "<":
                    return $var1 < $var2;
                default:
                    return true;
            }
        };

        $isNth = function ($condition, $today, $dte2, $compare_by = 'years') use ($compare) {
            $nth_value     = DateFunction::Subtract($today, $dte2, 'years');
            $nth_condition = '=';


            if ($condition->nth_condition != null) {
                $nth_condition = $condition->nth_condition;
            }

            return $compare($nth_value, $nth_condition, $condition->nth);
        };

        if ($this->client->person_id) {
            $person = Person::getBy(['person_id' => $this->client->person_id]);
        } else {
            /**
             * client entity ise girmicek
             */
            $this->is_applicable = false;

            return;
        }

        $is_applicable = false;
        foreach ($this->conditions as $condition) {

            $start      = $condition->start_date;
            $end        = $condition->end_date;
            $end_time   = $condition->end_time;
            $start_time = $condition->start_time;

            if ($condition->condition == 'anyday') {
                $is_applicable = true;
            } else if ($condition->condition == 'special_event') {

                switch ($condition->event) {
                    case 'birthday':

                        /**
                         * dont check if there is no date available.
                         */
                        if (null == $person->date_of_birth) {
                            break;
                        }

                        $checkDate = new WTDate($person->date_of_birth);
                        if ($checkDate->month !== $date->month || $checkDate->day !== $date->day) {
                            break;
                        }

                        $is_applicable = true;

                        if ($condition->nth != null) {
                            $is_applicable = $isNth($condition, $date, $checkDate);
                        }

                        break;

                    case 'wedding_anniversary':

                        /**
                         * dont check if there is no date available.
                         */
                        if (null == $person['date_of_marriage']) {
                            break;
                        }

                        /**
                         * convert the date string to WTDate
                         */
                        $checkDate = new WTDate($person['date_of_marriage']);

                        /**
                         * check if today is the day
                         */
                        if ($checkDate->month !== $date->month || $checkDate->day !== $date->day) {
                            break;
                        }

                        /**
                         * yay! it is.
                         */
                        $is_applicable = true;

                        if ($condition->nth != null) {
                            $is_applicable = $isNth($condition, $date, $checkDate);
                        }


                        break;

                    case 'customer_anniversary':
                        /**
                         * dont check if there is no date available.
                         */
                        if (null == $person['registration_date']) {
                            break;
                        }

                        $checkDate = new WTDate($person['registration_date']);
                        if ($checkDate->month !== $date->month || $checkDate->day !== $date->day) {
                            break;
                        }

                        $is_applicable = true;

                        if ($condition->nth != null) {
                            $is_applicable = $isNth($condition, $date, $checkDate);
                        }


                        break;


                    case 'shopping':

                        /***
                         * musterinin yaptıgı alısveriş sayısı hesaplandıktan sonra yaptıgı alısveriş sayısana
                         * göre kontrol saglanacak
                         */
                        $is_applicable = true;
                        break;
                }

            } else if ($condition->condition == 'date_interval') {
                if (($start <= $date->GetDateFormattedForDB() && $date->GetDateFormattedForDB() <= $end)
                    && ($start_time <= $date->GetTime() && $date->GetTime() <= $end_time)) {

                    $is_applicable = true;
                } else {
                    $is_applicable = false;

                }

            } else if ($condition->condition == 'time_frame') {
                /**
                 * @todo: timeframe needs to be implemented.
                 */
            }

            if ($is_applicable) {
                // break the foreach loop
                break;
            }
        }

        $this->is_applicable = $is_applicable;
    }

    public function checkBySubject()
    {
        $is_applicable = null;

        /**
         * note that, proceeding method calls will set the `is_applicable` flag.
         * null: the check is not suitable for this coupon and no any decision made, so continue with the check.
         * false: a decision is made, and the coupon is no good.
         * true: a decision is made, and the coupon is good.
         */

        if ($is_applicable == null) {
            $is_applicable = CouponObject::checkBySubjectType('shopping');
        }

        /**
         * checkBySubjectType will return;
         *  true: if of the same type and applicable,
         *  false: if of the same type and NOT applicable,
         *  null: if not the same type!
         */
        if ($is_applicable == null) {
            $is_applicable = CouponObject::checkBySubjectType('saleitem');
        }

        /**
         * if it is not saleitem coupon then we advance to checking for brand coupon.
         *
         * NOTE that a coupon cannot be both saleitem and brand coupon at the same time.
         * It is either/or.
         */
        if ($is_applicable === null) {
            $is_applicable = CouponObject::checkBySubjectType('brand');
        }

        if ($is_applicable === null) {
            $is_applicable = CouponObject::checkBySubjectType('saleitem_group');
        }

        $this->is_applicable = $is_applicable;
    }

    private function checkBySubjectType($type)
    {

        $is_applicable = null;

        /**
         * buffer needs to be re-considered according to foreach-loop.
         * read notes.txt item 1 for this situation.
         */
        $ctr = 0;
        foreach ($this->subjects as $subject) {
            // ----------------------------------------------------
            /**
             * we assume that there can be only one subject available
             * although we support more as we use an array for subjects.
             * This is something we can work on to improve the functionality of the program.
             *
             * So, here we check to ensure the foreach-loop won't loop more than one time.
             */
            if ($ctr > 0) {
                break;
            }
            $ctr++;
            // ----------------------------------------------------

            /**
             * make sure that this coupon is for a saleitem
             * otherwise, do NOT set the "applicable" status, so that
             * it will be able to get evaluated for further conditions.
             */
            if ($subject->type !== $type) {
                continue;
            }

            /**
             * we, now, know that this coupon is for a saleitem.
             */
            $is_applicable = false;

            /**
             * Below `foreach and reference` is tested and
             * is working properly.
             *
             * we need to pass or work with the saleitem object originating
             * from CouponInspector::$postData['sale_items']
             */
            foreach ($this->saleitems as &$item) {

                if (DEBUG) {
                    $CI_postData =& CouponInspector::getPostData();
                    $item['__x'] = 5001;
                }

                if (array_key_exists('exempt', $item)) {
                    continue;
                }

                switch ($type) {
                    case 'saleitem_group':
                        if ($item['group_id'] != $subject->{'saleitem_group_id'}) {
                            continue;
                        }
                        $is_applicable = true;
                        $this->buffer->add($item);
                        break;
                    case 'shopping':
                        /**
                         * shopping doesn't require anything to be checked.
                         * set as applicable, and add it to shoppingBuffer.
                         */
                        $is_applicable = true;
                        $this->buffer->addShopping($item);
                        break;

                    case 'brand':
                    case 'saleitem':
                        /**
                         * we are checking for either this is a brand or saleitem
                         * pay attention to "$type.'_id'" declaration.
                         * it is used for both cases.
                         */
                        if ($item['saleitem'][ $type . '_id' ] != $subject->{$type . '_id'}) {
                            continue;
                        }

                        $is_applicable = true;

                        $this->buffer->add($item);
                        break;
                }
            }

        }

        return $is_applicable;
    }

    public function checkByRequirement()
    {
        $is_applicable = false;

        foreach ($this->requirements as $requirement) {

            switch ($requirement->requirement) {
                case 'payment':
                    $is_applicable = $this->buffer->checkRequirementPayment($requirement);
                    break;

                case 'quantity':
                    $is_applicable = $this->buffer->checkRequirementQuantity($requirement);
                    break;
            }

            if ($is_applicable) {
                $type_ids = explode(',', $requirement->payment_type_id);

                if (($requirement->amount == 0 || $requirement->amount == null) && $requirement->coupon_subject == 'saleitem') {
                    foreach ($this->saleitems as $sale_item) {
                        if ($sale_item['saleitem']['saleitem_id'] != $requirement->saleitem_id) {
                            return;
                        }

                        $requirement->amount = $sale_item['saleitem']['taxed_price'];
                    }
                }

                $is_applicable = $this->payment->checkPaymentPossibility($requirement->amount, $type_ids, $this);
            }
        }

        $this->is_applicable = $is_applicable;
    }

    public function releasePaymentPreservation()
    {
        $this->payment->releasePreservationByCoupon($this);
    }

    public function assign()
    {
        if (DEBUG) {
            $CI_postData =& CouponInspector::getPostData();
        }

        /**
         * We do not assign the coupon to shopping coupons.
         * Check to see that this is not a shopping coupon.
         */
        if ($this->subjects[0]->type != 'shopping') {
            $this->buffer->assignCouponToSaleItems();
        }

    }

    public function setDefaultPaymentTypeId($type_id)
    {
        $this->default_payment_type_id = $type_id;
    }

    public function load()
    {
        $this->rewards      = CouponReward::getBy(['coupon_id' => $this->coupon_id], false);
        $this->requirements = CouponRequirement::getBy(['coupon_id' => $this->coupon_id], false);
        $this->conditions   = CouponCondition::getBy(['coupon_id' => $this->coupon_id], false);
        $this->subjects     = CouponSubject::getBy(['coupon_id' => $this->coupon_id], false);
        $this->targets      = CouponTarget::getBy(['coupon_id' => $this->coupon_id], false);
    }

    /**
     * Sets is_applicable to false
     * Note that while using this method, extra attention should be paid.
     * Once the coupon is `not` applicable, it will be eliminated immediately.
     */
    public function setUnapplicable()
    {
        $this->is_applicable = false;
    }

    public function getSaleitems()
    {
        return $this->saleitems;
    }

    public function getTotal()
    {
        return $this->total;
    }

    public function getCouponId()
    {
        return $this->coupon_id;
    }

    public function getSubjectById($subject_id)
    {
        $return = null;

        foreach ($this->subjects as &$subject) {
            if ($subject->coupon_subject_id == $subject_id) {
                $return = $subject;
                break;
            }
        }

        return $return;
    }

    public function getBestRewardPoint()
    {
        $max_point = null;
        foreach ($this->rewards as $reward) {

            if ($reward->reward_type !== 'point') {
                continue;
            }

            $point = $this->calculateRewardPoint($reward);

            if ($point > $max_point) {
                $max_point = $point;
            }

        }

        return $max_point;
    }

    public function calculateRewardPoint(CouponRewardRecord $reward)
    {

        if ($reward->is_percentage != true) {
            return $reward->amount;
        }

        $buffer_type = $this->type == 'shopping' ? 'shopping' : 'items';
        $total_sale  = $this->buffer->getTotalPrice($buffer_type);

        return $total_sale * $reward->amount / 100;
    }

    public function getBufferTotal()
    {
        $buffer_type = $this->type == 'shopping' ? 'shopping' : 'items';

        return $this->buffer->getTotalPrice($buffer_type);
    }

    public function getBuffer()
    {
        return $this->buffer;
    }

}