<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponReward;


use BYRWEB\base\ADbRecord;

class CouponRewardRecord extends ADbRecord
{
    public $coupon_reward_id, $reward_type_id, $amount, $is_percentage, $saleitem_id, $giftvoucher_id,
        $coupon_id, $is_subtracted_from_sale_totals, $is_discounted_price_regarded, $__is_incomplete;
    
    public $reward_type;


    public function __construct()
    {
        $this->setTableName('coupon_reward');
        $this->setPrimaryKey('coupon_reward_id');
        $this->setSqlQuery("SELECT _.* FROM (
        SELECT
        cr.*,
        t.`name` AS reward_type,
        saleitem.name as saleitem_name
        FROM
        coupon_reward AS cr
        LEFT JOIN type AS t ON t.type_id = cr.reward_type_id
        LEFT JOIN saleitem ON saleitem.saleitem_id = cr.saleitem_id
        ) AS _");
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }

}

