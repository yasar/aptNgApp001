<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\couponTargetGroup;


use BYRWEB\base\ADbRecord;

class CouponTargetGroupRecord extends ADbRecord
{

    public $coupon_target_group_id, $coupon_target_id, $client_group_id, $staff_group_id, $card_type_id;

    public function __construct()
    {
        $this->setTableName('coupon_target_group');
        $this->setPrimaryKey('coupon_target_group_id');
        $this->required_incomplete_fields = ['coupon_target_id'];
        $this->uses_enterprise_id         = false;
        $this->setSqlQuery("SELECT _.* FROM (
		SELECT
	ctg.*, lcg.`name` AS clientgroup,
	lsg.`name` AS staffgroup,
	t.`name` AS card_type
FROM
	coupon_target_group AS ctg
LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = ctg.client_group_id
LEFT JOIN lup_staff_group AS lsg ON lsg.staff_group_id = ctg.staff_group_id
LEFT JOIN card AS c ON c.type_id = ctg.card_type_id
LEFT JOIN type AS t ON c.type_id = t.type_id
GROUP BY
	ctg.coupon_target_group_id
	    ) AS _");
    }

}

