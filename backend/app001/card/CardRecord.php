<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\card;


use BYRWEB\base\ADbRecord;

class CardRecord extends ADbRecord
{

    public $card_id,
        $entity_id,
        $branch_id,
        $card_no,
        $security_code,
        $in_use,
        $password,
        $attempt_ctr,
        $type_id;

    public function __construct()
    {
        $this->setTableName('card');
        $this->setPrimaryKey('card_id');
        $this->setSearchableFields(['card_no']);
        $this->setSqlQueryFind("SELECT _.* FROM (
		SELECT
	cc.client_id,
	c.card_id,
	c.card_no,
	c.in_use,
	c.enterprise_id,
	c.type_id,
	b.branch,
cc.is_primary,
	t.title as `type`,
t.name as `name`,
	CONCAT(
		p.first_name,
		' ',
		p.last_name
	) AS full_name
FROM
	card AS c
LEFT JOIN branch AS b ON b.branch_id = c.branch_id
LEFT JOIN client_card AS cc ON cc.card_id = c.card_id
LEFT JOIN client AS cli ON cli.client_id = cc.client_id
LEFT JOIN person AS p ON p.person_id = cli.person_id
LEFT JOIN type AS t ON t.type_id= c.type_id
GROUP BY
	c.card_id ) AS _");

    }

}

