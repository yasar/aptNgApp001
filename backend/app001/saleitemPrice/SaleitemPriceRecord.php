<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\saleitemPrice;




use BYRWEB\app001\price\PriceRecord;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;


class SaleitemPriceRecord extends ADbRecord
{
	
	public $saleitem_price_id, $saleitem_id, $price_type_id, $is_active, $price_id, $__is_incomplete, $timestamp, $enterprise_id, $is_deleted, $is_primary;
	
	/**
	 * @var $price PriceRecord
	 */
	public $price;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName('`app001.saleitem_price`');
		$this->setPrimaryKey('saleitem_price_id');
		$this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_GET);
		$this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/list.sql')), SqlObject::SQL_FOR_LISTING);
		$this->required_incomplete_fields = ['saleitem_id', 'price_type_id', 'price_id'];
		$this->excluded_update_fields     = ['saleitem_id', 'price_id'];
	}
	
	
	
	/**
	 * @throws \BYRWEB\base\exceptions\DatabaseException
	 */
	public
	function loadPrice()
	{
		$this->price = new PriceRecord();
		$this->price->setDb($this->getDb());
		$this->price->setPrimaryValue($this->price_id);
		$this->price->load();
	}
	
	
	
	/**
	 * @throws \BYRWEB\base\exceptions\DatabaseException
	 */
	protected
	function afterLoad()
	{
		$this->loadPrice();
	}
	
	
	
	protected
	function beforeAdd()
	{
	
	}
}

