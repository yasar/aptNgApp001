<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponReward;




use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class CouponRewardRecord extends ADbRecord
{
	public const TABLE_NAME = '`app001.coupon_reward`';
	public $coupon_reward_id, $reward_type_id, $amount, $is_percentage, $saleitem_id, $giftvoucher_id, $coupon_id, $is_subtracted_from_sale_totals, $is_discounted_price_regarded, $__is_incomplete;
	
	public $reward_type;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName(self::TABLE_NAME);
		$this->setPrimaryKey('coupon_reward_id');
		$this->setSqlQuery(new SqlObject('SELECT _.* FROM (
        SELECT
        cr.*,
        t.`name` AS reward_type,
        saleitem.name AS saleitem_name
        FROM
        `app001.coupon_reward` AS cr
        LEFT JOIN `app999.type` AS t ON t.type_id = cr.reward_type_id
        LEFT JOIN `app001.saleitem` ON saleitem.saleitem_id = cr.saleitem_id
        ) AS _'), SqlObject::SQL_FOR_FIND);
		$this->setSqlQueryStaticFilter('__is_incomplete is null');
		$this->required_incomplete_fields = ['coupon_id'];
	}
	
}

