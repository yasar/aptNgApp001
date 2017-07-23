<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\price;




use BYRWEB\app998\tax\Tax;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\Exception;
use BYRWEB\base\SqlObject;


//use BYRWEB\lup\tax\Tax;
//use BYRWEB\lup\tax\TaxRecord;

class PriceRecord extends ADbRecord
{
	
	
	public $price_id, $price, $currency_id, $currency_rate,
		$is_tax_included, $tax_id, $discount_type, $discount_percentage,
		$discount_amount, $base_price, $tax, $taxed_price, $timestamp, $__is_incomplete;
	
	
	
	public
	function __construct()
	{
		parent::__construct();
		
		$this->setTableName('`app001.price`');
		$this->setPrimaryKey('price_id');
		$this->setSqlQuery(new SqlObject('SELECT
	_.*
FROM
	(
	SELECT
	p.*,
	lc.currency,
	lc.unit AS currency_unit,
    lc.`code` AS currency_code,
	lt.tax_percentage
FROM
	`app001.price` AS p
LEFT JOIN lup_currency AS lc ON lc.currency_id = p.currency_id
LEFT JOIN lup_tax AS lt ON lt.tax_id = p.tax_id
	) AS _'), SqlObject::SQL_FOR_FIND);
	
	}
	
	
	
	public
	function analyseTax()
	{
		if (!$this->tax_id) {
			throw new Exception('Price needs a tax_id defined.');
		}
		
		$this->db->disableCheckRight();
		$taxRecord = Tax::getBy(['tax_id' => $this->tax_id]);
		$this->db->enableCheckRight();
		
		if (!$taxRecord) {
			throw new Exception('Price can not get/found the tax record.');
		}
		
		if ($this->is_tax_included) {
			$this->base_price  = $this->price / ((1 + $taxRecord->tax_percentage / 100));
			$this->taxed_price = $this->price;
			$this->tax         = $this->taxed_price - $this->base_price;
		}
		else {
			$this->taxed_price = $this->price + (($this->price * $taxRecord->tax_percentage) / 100);
			$this->base_price  = $this->price;
			$this->tax         = $this->taxed_price - $this->base_price;
		}
	}
	
}

