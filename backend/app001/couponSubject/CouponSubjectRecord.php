<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponSubject;


use BYRWEB\base\ADbRecord;

class CouponSubjectRecord extends ADbRecord
{
    public $coupon_subject_id, $coupon_id, $type_id, $saleitem_id, $saleitem_group_id, $brand_id,
        $target_scope_type_id, $__is_incomplete;


    public function __construct()
    {
        $this->setTableName('coupon_subject');
        $this->setPrimaryKey('coupon_subject_id');
        $this->setSqlQuery("SELECT _.* FROM (
		 SELECT
            cs.*,
            t.`name` as type,
            s.name as saleitem_name,
            lsg.name as saleitemgroup,
            lb.name as brand
            FROM
            coupon_subject AS cs
            LEFT JOIN type AS t ON t.type_id = cs.type_id
            LEFT JOIN saleitem AS s ON s.saleitem_id = cs.saleitem_id
            LEFT JOIN lup_saleitem_group AS lsg ON lsg.saleitem_group_id = cs.saleitem_group_id
            LEFT JOIN lup_brand AS lb ON lb.brand_id = cs.brand_id
	    ) AS _");
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields = ['coupon_id'];
    }

}

