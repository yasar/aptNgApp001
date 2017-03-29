<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponTarget;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class CouponTargetRecord extends ADbRecord
{
    public $coupon_target_id, $coupon_id, $type_id, $__is_incomplete;
    
    
    public function __construct()
    {
        parent::__construct();
        $this->setTableName('`app001.coupon_target`');
        $this->setPrimaryKey('coupon_target_id');
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_FIND);
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }
    
}

