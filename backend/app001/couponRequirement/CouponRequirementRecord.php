<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponRequirement;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class CouponRequirementRecord extends ADbRecord
{
    public $coupon_requirement_id, $requirement_type_id, $amount, $payment_type_id,
        $coupon_id, $coupon_subject_id, $__is_incomplete;
    
    public $requirement;
    public $payment;
    public $coupon_subject;
    public $saleitem_id;
    
    
    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app001.coupon_requirement`');
        $this->setPrimaryKey('coupon_requirement_id');
        $this->setSqlQuery(new SqlObject("SELECT _.* FROM (
        SELECT
			cr.*, t.`name` AS requirement,
			ty.`name` AS payment,
			ts. NAME AS coupon_subject,
			cs.saleitem_id
		FROM
			`app001.coupon_requirement` AS cr
		LEFT JOIN `app999.type` AS t ON t.type_id = cr.requirement_type_id
		LEFT JOIN `app999.type` AS ty ON ty.type_id = cr.payment_type_id
		LEFT JOIN `app001.coupon_subject` AS cs ON cs.coupon_subject_id = cr.coupon_subject_id
		LEFT JOIN `app999.type` AS ts ON ts.type_id = cs.type_id
	    ) AS _"), SqlObject::SQL_FOR_FIND);
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }
    
}

