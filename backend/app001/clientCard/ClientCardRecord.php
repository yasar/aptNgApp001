<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\clientCard;




use BYRWEB\app001\card\Card;
use BYRWEB\app001\card\CardRecord;
use BYRWEB\app999\entity\EntityRecord;
use BYRWEB\app999\person\PersonRecord;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class ClientCardRecord extends ADbRecord
{
	public const TABLE_NAME = '`app001.client_card`';
	
	public $client_card_id, $enterprise_id, $client_id, $card_id, $is_primary, $password;
	public                                                                     $card_no;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName(self::TABLE_NAME);
		$this->setPrimaryKey('client_card_id');
		$this->setSqlQuery(new SqlObject('SELECT * FROM (
        SELECT
        cc.client_card_id,
        cc.client_id,
        cc.card_id,
        cc.is_primary,
        cc.enterprise_id,
        c.card_no
        FROM ' . self::TABLE_NAME . ' AS cc
        INNER JOIN ' . CardRecord::TABLE_NAME . ' AS c ON c.card_id = cc.card_id
        ) _'), SqlObject::SQL_FOR_FIND);
	}
	
	
	
	/**
	 * @throws \BYRWEB\base\exceptions\Exception
	 */
	protected
	function afterAdd()
	{
		$card = new Card();
		$card->setDb($this->db);
		$cardRecord         = $card->get($this->card_id);
		$cardRecord->in_use = 1;
		$cardRecord->update();
	}
}

