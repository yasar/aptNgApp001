<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\card;




use BYRWEB\app001\clientCard\ClientCardRecord;
use BYRWEB\app999\client\ClientRecord;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class CardRecord extends ADbRecord
{
	public const TABLE_NAME = '`app001.card`';
	
	public $card_id, $entity_id, $branch_id, $card_no, $security_code, $in_use, $password, $attempt_ctr, $type_id;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName(self::TABLE_NAME);
		$this->setPrimaryKey('card_id');
		$this->setSearchableFields(['card_no']);
		$this->setSqlQuery(new SqlObject('SELECT _.* FROM (
		SELECT
	cc.client_id,
	c.card_id,
	c.card_no,
	c.in_use,
	c.enterprise_id,
	c.type_id,
	b.branch,
cc.is_primary,
	t.title AS `type`,
t.name AS `name`,
	CONCAT(
		p.first_name,
		" ",
		p.last_name
	) AS full_name
FROM
	card AS c
LEFT JOIN `app999.branch` AS b ON b.branch_id = c.branch_id
LEFT JOIN ' . ClientCardRecord::TABLE_NAME . ' AS cc ON cc.card_id = c.card_id
LEFT JOIN ' . ClientRecord::TABLE_NAME . ' AS cli ON cli.client_id = cc.client_id
LEFT JOIN `app999.person` AS p ON p.person_id = cli.person_id
LEFT JOIN `app999.type` AS t ON t.type_id= c.type_id
GROUP BY
	c.card_id ) AS _'), SqlObject::SQL_FOR_FIND);
	
	}
	
}

