<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 28.05.2016
 * Time: 15:59
 */

namespace BYRWEB\app001\point;




use BYRWEB\base\ADbRecord;


class PointRecord extends ADbRecord
{
	public const TABLE_NAME = '`app001.point`';
	public $card_id;
	public $client_id;
	public $coupon_id;
	public $enterprise_id;
	public $money_earned;
	public $money_spent;
	public $money_total;
	public $point_id;
	public $point_value_id;
	public $points_earned;
	public $points_spent;
	public $points_total;
	public $sale_id;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName(self::TABLE_NAME);
		$this->setPrimaryKey('point_id');
		//        $this->setSqlQueryStaticFilter('__is_incomplete is null');
	}
}