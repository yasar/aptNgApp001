<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\cashSale;




use BYRWEB\app001\saleSaleItem\SaleSaleItemRecord;
use BYRWEB\app900\sale\SaleRecord;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\Exception;


//class CashSaleRecord extends ADbRecord
class CashSaleRecord extends SaleRecord
{
	public $sale_id;
	public $transaction_id;
	public $staff_id;
	public $client_id;
	public $enterprise_id;
	public $till_id;
	public $branch_id;
	public $total;
	public $tax;
	public $grand;
	public $discount;
	public $description;
	public $voucher_num;
	
	/**
	 * @var SaleSaleItemRecord[]
	 */
	private $sale_items;
	
	
	
	public
	function __construct()
	{
		//        $this->setTableName('sale');
		//        $this->setPrimaryKey('sale_id');
		//        $this->setSqlQueryStaticFilter('__is_incomplete is null');
		parent::__construct();
		$this->setSqlQueryStaticFilter('__is_incomplete is null');
	}
	
	
	
	public
	function addSaleItem(SaleSaleItemRecord $item)
	{
		$this->sale_items[] = $item;
	}
	
	
	
	public
	function getSaleItems()
	{
		return $this->sale_items;
	}
	
	
	
	public
	function add($updateOnDuplicate = false)
	{
		$this->getDb()
		     ->beginTransaction();
		$result = parent::add($updateOnDuplicate);
		
		if ($result) {
			foreach ($this->sale_items as $saleItemRecord) {
				$saleItemRecord->sale_id = $this->sale_id;
				$result                  = $saleItemRecord->add();
				if (!$result) {
					break;
				}
			}
		}
		
		if ($result) {
			$this->getDb()
			     ->commit();
		}
		else {
			$this->getDb()
			     ->rollBack();
			throw new Exception('SaleRecord can not be added');
		}
		
		return $result;
	}
	
}

