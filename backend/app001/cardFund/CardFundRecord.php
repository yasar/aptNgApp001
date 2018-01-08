<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 18.01.2016
 * Time: 13:31
 */


namespace BYRWEB\app001\cardFund;




use BYRWEB\app001\price\PriceRecord;
use BYRWEB\app001\saleitem\Saleitem;
use BYRWEB\app001\saleitemPrice\SaleitemPriceRecord;
use BYRWEB\app900\purchaseItem\PurchaseItemRecord;
use BYRWEB\app999\entity\EntityRecord;
use BYRWEB\app999\staff\StaffRecord;
use BYRWEB\app999\type\Type;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;
use BYRWEB\common\Session;


class CardFundRecord extends ADbRecord
{
	public const TABLE_NAME = '`app001.card_fund`';
	
	public $card_fund_id, $enterprise_id, $transaction_id, $card_id, $client_id, $date, $deposit, $withdraw, $balance, $timestamp, $description;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName(self::TABLE_NAME);
		$this->setSearchableFields(['card_fund_id']);
		$this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/listing.sql')), SqlObject::SQL_FOR_LISTING);
	}
	
}