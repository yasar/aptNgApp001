<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponTargetGroup;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class CouponTargetGroupRecord extends ADbRecord
{
    
    public $coupon_target_group_id, $coupon_target_id, $client_group_id, $staff_group_id, $card_type_id;
    
    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app001.coupon_target_group`');
        $this->setPrimaryKey('coupon_target_group_id');
        $this->required_incomplete_fields = ['coupon_target_id'];
        $this->uses_enterprise_id         = false;
        $this->setSqlQuery(new SqlObject("SELECT _.* FROM (
		SELECT
	ctg.*, lcg.`name` AS clientgroup,
	lsg.`name` AS staffgroup,
	t.`name` AS card_type
FROM
	`app001.coupon_target_group` AS ctg
LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = ctg.client_group_id
LEFT JOIN lup_staff_group AS lsg ON lsg.staff_group_id = ctg.staff_group_id
LEFT JOIN `app001.card` AS c ON c.type_id = ctg.card_type_id
LEFT JOIN `app999.type` AS t ON c.type_id = t.type_id
GROUP BY
	ctg.coupon_target_group_id
	    ) AS _"), SqlObject::SQL_FOR_FIND);
    }
    
}

