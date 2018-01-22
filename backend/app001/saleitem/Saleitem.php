<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\saleitem;




use BYRWEB\base\ADbObject;
use BYRWEB\base\Exception;
use BYRWEB\base\IDbObject;
use BYRWEB\base\SqlObject;
use BYRWEB\base\WTDbUtils;


class Saleitem extends ADbObject implements IDbObject
{
	/**
	 *
	 */
	public
	function __construct()
	{
		parent::__construct();
		$this->setRecordObject(new SaleitemRecord());
	}
	
	
	
	public static
	function stockUp($saleitem_id, $qty)
	{
		$sql = "update `app001.saleitem` set stock=stock-{$qty} where saleitem_id={$saleitem_id}";
		$db  = WTDbUtils::$db;
		$db->execUpdate($sql);
		
		/* $stock = new Stock();
		 $stock->setDb(self::getDb());
		 $stock->increase($saleitem_id, $qty);*/
	}
	
	
	
	public static
	function stockDown($saleitem_id, $qty)
	{
		$sql = "update `app001.saleitem` set stock=stock+{$qty} where saleitem_id={$saleitem_id}";
		$db  = WTDbUtils::$db;
		$db->execUpdate($sql);
		/*   $stock = new Stock();
		   $stock->setDb(self::getDb());
		   $stock->decrease($saleitem_id, $qty);*/
	}
	
	
	
//	/**
//	 * @param $id
//	 *
//	 * @return SaleitemRecord
//	 */
//	public
//	function get($id)
//	{
//		/**
//		 * @var SaleitemRecord
//		 */
//		return parent::get($id);
//		//
//	}
	
	
	
	//	/**
	//	 * @param $data
	//	 *
	//	 * @return bool|SaleitemRecord
	//	 */
	//	public
	//	function add($data, $updateOnDuplicate = false)
	//	{
	//		//        $data['enterprise_id'] = $_SESSION['user']['enterprise_id'];
	//		return parent::add($data, $updateOnDuplicate);
	//	}
	
	
	//	/**
	//	 * @param $data
	//	 *
	//	 * @return bool|SaleitemRecord
	//	 */
	//	public
	//	function update($data)
	//	{
	//
	//		return parent::update($data);
	//	}
	
	
	public
	function getByBarcode($barcode)
	{
		$saleitem = self::getBy(['barcode' => $barcode, 'for' => 'cashSale'], true, $this);
		
		return $saleitem;
	}
	
	
	
	public
	function getMostSoldSaleitem($filter)
	{
		
		$sql = 'SELECT
					si.saleitem_id
				FROM
					`app001.saleitem` AS si
				INNER JOIN `app900.sale_item` AS s_i ON si.saleitem_id = s_i.saleitem_id
				INNER JOIN `app900.sale` AS s ON s.sale_id = s_i.sale_id ';
		
		if (array_key_exists('client_id', $filter)) {
			$sql .= ' WHERE s.client_id =' . $filter['client_id'] . ' GROUP BY si.saleitem_id ORDER BY s_i.qty DESC ';
		}
		else {
			$sql .= ' GROUP BY si.saleitem_id ORDER BY s_i.qty DESC ';
		}
		
		$sth = $this->db->query($sql);
		
		if ($sth->errorCode() !== '00000') {
			error_log(implode('|', $sth->errorInfo()));
		}
		
		$saleitemIds = $sth->fetchAll(\PDO::FETCH_COLUMN, 0);
		
		if ($saleitemIds === null) {
			return [];
		}
		$saleitems = $this->find(['for' => 'cashSale'], null, null, [], null, ['field'  => 'saleitem_id',
		                                                                       'values' => $saleitemIds]);
		
		return $saleitems;
	}
	
	
	
	/**
	 * @param null  $filter
	 * @param null  $keyword
	 * @param null  $limit
	 * @param array $order
	 * @param null  $selectOnly
	 *
	 * @param null  $lookIn
	 *
	 * @return array
	 * @throws Exception
	 * @throws \BYRWEB\base\exceptions\Exception
	 */
	public
	function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null): array
	{
		if ($this->for === null) {
			if (isset($filter['for'])) {
				$this->for = $filter['for'];
				unset($filter['for']);
			}
		}
		
		
		switch ($this->for) {
			case 'saleInvoice':
				$this->getRecordObject()
				     ->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/saleInvoice.sql')), $this->for);
				$result = parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
				break;
			case 'purchase':
			case 'purchaseInvoice':
				$this->getRecordObject()
				     ->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/purchaseInvoice.sql')), $this->for);
				$result = parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
				break;
			case 'cashSale':
				$this->getRecordObject()
				     ->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/cashSale.sql')), $this->for);
				$result = parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
				break;
			case 'shopping_cart':
			case 'browse':
				$result = parent::browse($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
				break;
			case 'detailed':
				throw new Exception('check the code');
				break;
			//            case 'purchase':
			default:
				$result = parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
		}
		
		return $result;
	}
	
	
}