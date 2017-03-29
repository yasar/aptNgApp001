<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponCondition;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class CouponConditionRecord extends ADbRecord
{
    public $coupon_condition_id, $coupon_id, $condition_type_id, $event_type_id, $nth, $nth_condition,
        $start_date, $end_date, $start_time, $end_time, $extra_hours_early_start, $extra_hours_late_end,
        $timeframe_start, $timeframe_end, $shopping_channel_type_id, $__is_incomplete, $enterprise_id;
    
    public $condition;
    public $event;
    public $shopping_channel;


    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app001.coupon_condition`');
        $this->setPrimaryKey('coupon_condition_id');
        $this->setSqlQuery(new SqlObject("SELECT _.* FROM (
		 SELECT
           cc.*,
            tc.`name` AS `condition`,
            te.`name` AS `event`,
            ts.`name` AS shopping_channel,
            v.title
            FROM
            `app001.coupon_condition` AS cc
            LEFT JOIN `app001.coupon` AS v ON v.coupon_id = cc.coupon_id
            LEFT JOIN `app999.type` AS tc ON cc.condition_type_id = tc.type_id
            LEFT JOIN `app999.type` AS te ON cc.event_type_id = te.type_id
            LEFT JOIN `app999.type` AS ts ON cc.shopping_channel_type_id = ts.type_id
	    ) AS _"), SqlObject::SQL_FOR_FIND);
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }

}

