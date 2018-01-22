<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\coupon;




use BYRWEB\app999\type\Type;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class CouponRecord extends ADbRecord
{
	public $coupon_id, $enterprise_id, $branch_id, $title, $code, $description, $is_published, $timestamp, $__is_incomplete, $status_id;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName('`app001.coupon`');
		$this->setPrimaryKey('coupon_id');
		//		$this->setSqlQuery(new SqlObject("SELECT _.* FROM (
		//		    SELECT c.*, t.name AS coupon_status FROM `app001.coupon` AS c
		//		    INNER JOIN `app999.type` t ON t.type_id = c.status_id
		//	    ) AS _"), SqlObject::SQL_FOR_FIND);
		$this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_FIND);
		$this->setSqlQueryStaticFilter('__is_incomplete is null');
		$this->required_incomplete_fields = ['status_id'];
	}
	
	
	
	protected
	function beforeAdd()
	{
		$type            = Type::getBy(['groupname' => 'coupon_status', 'name' => 'draft']);
		$this->status_id = $type->type_id;
	}
}

