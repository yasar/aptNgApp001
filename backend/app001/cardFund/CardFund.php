<?php


namespace BYRWEB\app001\cardFund;




use BYRWEB\app900\current\Current;
use BYRWEB\app900\current\CurrentRecord;
use BYRWEB\app999\clientStats\ClientStats;
use BYRWEB\base\ADbObject;
use BYRWEB\base\WTDate;


/**
 * Class CardFund
 *
 * @package BYRWEB\app001\cardFund
 * @method CardFundRecord getRecordObject()
 */
class CardFund extends ADbObject
{
	
	
	public
	function __construct()
	{
		parent::__construct();
		$this->setRecordObject(new CardFundRecord());
	}
	
	
	
	/**
	 * Adds record into CardFund table, then updates the ClientStats table accordingly.
	 *
	 * @param      $data
	 * @param bool $updateOnDuplicate
	 *
	 * @return bool|CardFundRecord|void
	 * @throws \Exception
	 */
	public
	function add($data, $updateOnDuplicate = false)
	{
		//		return $this->deposit($data);
		$this->getDb()
		     ->beginTransaction();
		
		try {
			/**
			 * @var CardFundRecord $result
			 */
			$result = parent::add($data, $updateOnDuplicate);
			
			$stats             = ClientStats::getBy(['client_id' => $result->client_id,
			                                         'card_id'   => $result->card_id]);
			$stats->total_fund += (float)$result->deposit - (float)$result->withdraw;
			$stats->update();
			$this->getDb()
			     ->commit();
			
			return $result;
		}
		catch (\Exception $e) {
			$this->getDb()
			     ->rollBack();
			throw $e;
		}
	}
	
}