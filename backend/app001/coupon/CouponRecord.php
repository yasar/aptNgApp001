<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\coupon;


use BYRWEB\base\ADbRecord;

class CouponRecord extends ADbRecord
{
    public $coupon_id, $enterprise_id, $branch_id, $title, $code, $description, $is_published, $timestamp, $__is_incomplete, $status_id;


    public function __construct()
    {
        $this->setTableName('coupon');
        $this->setPrimaryKey('coupon_id');
        $this->setSqlQuery("SELECT _.* FROM (
		    SELECT c.*, t.name as coupon_status from coupon as c
		    INNER JOIN type t on t.type_id = c.status_id
	    ) AS _");
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->required_incomplete_fields=['status_id'];
    }

}

