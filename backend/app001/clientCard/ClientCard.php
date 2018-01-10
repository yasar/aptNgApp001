<?php

namespace BYRWEB\app001\clientCard;




use BYRWEB\app001\card\Card;
use BYRWEB\app001\card\CardRecord;
use BYRWEB\base\ADbObject;
use BYRWEB\base\Exception;
use BYRWEB\base\IDbObject;


/**
 * Class ClientCard
 *
 * @package BYRWEB\app001\clientCard
 * @method static ClientCardRecord getBy($filter, $singleRow = true, ADbObject $instance = null, string $mode = null, array $order = null, int $limit = null)
 * @method ClientCardRecord[] find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
 * @method bool|ClientCardRecord update($data)
 * @method ClientCardRecord getRecordObject()
 */
class ClientCard extends ADbObject
{
	/**
	 *
	 */
	public
	function __construct()
	{
		parent::__construct();
		$this->setRecordObject(new ClientCardRecord());
	}
	
	
	
	/**
	 * @param $id
	 *
	 * @return ClientCardRecord
	 * @throws \BYRWEB\base\exceptions\Exception
	 */
	public
	function get($id)
	{
		/**
		 * @var $record ClientCardRecord
		 */
		$record           = parent::get($id);
		$record->password = null;
		
		return $record;
	}
	
	
	
	/**
	 * @param      $data
	 *
	 * @param bool $updateOnDuplicate
	 *
	 * @return bool|ClientCardRecord
	 * @throws \Exception
	 */
	public
	function add($data, $updateOnDuplicate = false)
	{
		$clientCard = parent::add($data, $updateOnDuplicate);
		
		
		if (!$clientCard) {
			return false;
		}
		$card = new Card();
		$card->setDb($this->db);
		$cardRecord         = $card->get($data->card_id);
		$cardRecord->in_use = 1;
		$cardRecord->update();
		
		return $clientCard;
	}
	
	
	
	
	
	public static
	function getPrimaryCardId($client_id): ?int
	{
		$record = self::getBy(['client_id' => $client_id, 'is_primary' => 1]);
		if (!$record) {
			return null;
		}
		
		return $record->card_id;
	}
	
	
}