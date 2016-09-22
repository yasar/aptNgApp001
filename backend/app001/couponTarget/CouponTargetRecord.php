<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponTarget;


use BYRWEB\base\ADbRecord;

class CouponTargetRecord extends ADbRecord
{
    public $coupon_target_id, $coupon_id, $type_id, $__is_incomplete;


    public function __construct()
    {
        $this->setTableName('coupon_target');
        $this->setPrimaryKey('coupon_target_id');
        $this->setSqlQuery(file_get_contents(__DIR__ . '/sql/get.sql'));
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }

}

