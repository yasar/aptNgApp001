<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponSubject;




use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class CouponSubjectRecord extends ADbRecord
{
	public $coupon_subject_id, $coupon_id, $type_id, $saleitem_id, $saleitem_group_id, $brand_id, $target_scope_type_id, $__is_incomplete;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName('`app001.coupon_subject`');
		$this->setPrimaryKey('coupon_subject_id');
		$this->setSqlQuery(new SqlObject("SELECT _.* FROM (
		 SELECT
            cs.*,
            t.`name` AS type,
            s.name AS saleitem_name,
            lsg.name AS saleitemgroup,
            lb.name AS brand
            FROM
            `app001.coupon_subject` AS cs
            LEFT JOIN `app999.type` AS t ON t.type_id = cs.type_id
            LEFT JOIN `app001.saleitem` AS s ON s.saleitem_id = cs.saleitem_id
            LEFT JOIN lup_saleitem_group AS lsg ON lsg.saleitem_group_id = cs.saleitem_group_id
            LEFT JOIN lup_brand AS lb ON lb.brand_id = cs.brand_id
	    ) AS _"), SqlObject::SQL_FOR_FIND);
		$this->setSqlQueryStaticFilter('__is_incomplete is null');
		$this->required_incomplete_fields = ['coupon_id'];
	}
	
	
	
	protected
	function beforeAdd()
	{
		$this->saleitem_group_id = null;
		$this->brand_id = null;
//		if (array_key_exists('saleitem_id', $data)) {
//			unset($data['saleitem_group_id']);
//			if (array_key_exists('brand_id', $data)) {
//				unset($data['brand_id']);
//			}
//		}
//
//		return $data;
	}
}

