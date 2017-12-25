<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.07.2015
 * Time: 16:31
 */

namespace BYRWEB\app001\payment;




use BYRWEB\app001\cashSale\CashSale;


//use BYRWEB\app001\client\Client;
//use BYRWEB\app001\client\ClientRecord;
use BYRWEB\app001\couponInspector\CouponInspector;
use BYRWEB\app001\couponInspector\CouponInspectorResult;
use BYRWEB\app001\couponInspector\CouponPaymentSplit;
use BYRWEB\app001\couponInspector\CouponProcessor;
use BYRWEB\app001\point\PointRecord;
use BYRWEB\app001\point\PointValue;


use BYRWEB\app001\saleitem\Saleitem;
use BYRWEB\app001\saleitemPackage\SaleitemPackage;
use BYRWEB\app900\account\Account;
use BYRWEB\app900\current\CurrentRecord;
use BYRWEB\app900\invoice\Invoice;
use BYRWEB\app900\sale\SaleRecord;
use BYRWEB\app900\saleSaleItem\SaleSaleItemRecord;
use BYRWEB\app900\transaction\Transaction;
use BYRWEB\app999\client\Client;
use BYRWEB\app999\client\ClientRecord;
use BYRWEB\app999\type\Type;
use BYRWEB\base\Exception;
use BYRWEB\base\FUNC;
use BYRWEB\base\NestedPDO;
use BYRWEB\base\WTDate;
use BYRWEB\base\WTDbUtils;
use BYRWEB\common\Session;



class Payment //extends ADbObject
{
	/**
	 * @var NestedPDO
	 */
	public static $db = null;
	
	/**
	 * @var SaleRecord
	 */
	private static $saleRecord;
	
	/**
	 * @var ClientRecord
	 */
	private static $client = null;
	
	/**
	 * @var SaleSaleItemRecord[]
	 */
	private static $sale_items = [];
	
	private static $current_splits = [];
	
	/**
	 * @var WTDate
	 */
	private static $date;
	
	
	
	public static
	function process($post): bool
	{
		//        return;
		self::init($post);
		self::$date = new WTDate();
		
		$db = self::$db;
		$db->beginTransaction();
		
		try {
			CouponInspector::setPostData($post);
			
			$inspector = CouponInspector::getCoupons();
			
			/**
			 * processing stock here will ensure that
			 * if there is no stock available, then we won't have to go through a lengthy process.
			 * it will just raise an exception and will terminate the process cycle.
			 */
			self::processStock($post['saleItems']);
			
			/**
			 * exempt olan sale itemlar totala dahil edilmedigi için split bos geliyor.
			 * nedeni ise biz spliti gelen totale gore dolduruyoruz
			 * şimdi eger post içinden payment split bos ise tek tip ödeme oldugundan splite eger varsa new totali atıyoruz
			 *eger yok ise coupon inspectorden alıyoruz splitleri
			 */
			if (count($post['payment_splits']) === 0) {
				$split         = new CouponPaymentSplit();
				$split->amount = $inspector->new_total['grand'];
				$split->setTypeId($post['default_payment_type_id']);
				$splits[] = $split;
				
			}
			else {
				//                $splits =& CouponInspector::getPayment()->getSplits();
				$splits = CouponInspector::getPayment()
				                         ->getSplits();
			}
			
			$transaction_id = self::processTransaction($splits, $inspector);
			
			
			self::processSale($post, $inspector, $transaction_id);
			
			//            self::processCurrent($post, $inspector, $transaction_id);
			self::processCurrentSplits($transaction_id);
			/**
			 * for invoice
			 */
			self::processInvoice($post);
			
			self::processPoints($inspector, $splits);
			
			Client::updateStats(self::$saleRecord->client_id);
			
			
			self::addClientPackageItem($post['saleItems']);
		}
		catch (\Exception $e) {
			//			error_log($e->getMessage());
			$db->rollBack();
			FUNC::mailException($e);
			
			//			return false;
			throw $e;
		}
		
		$db->commit();
		
		return true;
	}
	
	
	
	/**
	 * @param array $post
	 */
	private static
	function init(array &$post): void
	{
		if (array_key_exists('client_id', $post)) {
			$client = new ClientRecord();
			$client->setDb(self::$db);
			$client->setPrimaryValue((int)$post['client_id']);
			$client->load();
			$post['client'] = self::$client = $client;
		}
	}
	
	
	
	private static
	function processStock($sale_items)
	{
		/**
		 *stok tablosu simdlik goz ardı edildigi için bu bolum bırakıldı.
		 * sadece saleitem tablosundaki qty bolumu guncellencek.
		 */
		
		/*  $stock = new Stock();
		  $stock->setDb(self::$db);
		  $stock->setBranchId(Session::user()->branch_id);
		  foreach ($sale_items as $sale_item) {
			  $saleitem_id = $sale_item['saleitem']['saleitem_id'];
			  $qty = $sale_item['qty'];
			  $stock->decrease($saleitem_id, $qty);
		  }*/
		
		
		foreach ($sale_items as $sale_item) {
			
			
			if ($sale_item['saleitem']['saleitem_type'] === 'service') {
				return;
			}
			
			
			if ($sale_item['saleitem']['saleitem_type'] === 'product') {
				Saleitem::stockUp($sale_item['saleitem']['saleitem_id'], $sale_item['qty']);
			}
			
			if ($sale_item['saleitem']['saleitem_type'] === 'package') {
				Saleitem::stockUp($sale_item['saleitem']['saleitem_id'], $sale_item['qty']);
				self::processPackageSaleitemsStock($sale_item);
			}
		}
		
	}
	
	
	
	private static
	function processPackageSaleitemsStock($sale_item)
	{
		$packageSaleitems = new SaleitemPackage();
		$packageSaleitems->setDb(self::$db);
		$packageSale_items = $packageSaleitems->find(['package_id' => $sale_item['saleitem']['saleitem_id']]);
		
		foreach ($packageSale_items as $packageSale_item) {
			Saleitem::stockUp($packageSale_item->saleitem_id, $packageSale_item->qty * $sale_item['qty']);
		}
		
	}
	
	
	
	/**
	 * @param $splits    CouponPaymentSplit[]
	 * @param $inspector \stdClass
	 *
	 * @return mixed
	 */
	private static
	function processTransaction(&$splits, $inspector)
	{
		/**
		 * @var $split CouponPaymentSplit
		 */
		
		$tx_splits = [];
		
		foreach ($splits as &$split) {
			$arr                         = self::getAccountAndTxTypeByPaymentType($split->getTypeId());
			$tx_split['account_id']      = $arr['account_id'];
			$tx_split['tx_type']         = $arr['tx_type'];
			$tx_split['amount']          = $split->amount;
			$tx_split['payment_type_id'] = $split->getTypeId();
			$tx_splits[]                 = $tx_split;
			
			if ($arr['special_account_code'] === Account::SPECIAL_SALES_CREDIT) {
				self::$current_splits[] = $tx_split;
			}
		}
		unset($split, $tx_split, $arr);
		
		$total     = $inspector->total;
		$new_total = $inspector->new_total;
		
		$tx_splits[] = ['account_id' => Account::SPECIAL_SALES,
		                'tx_type'    => 'credit',
		                'amount'     => $total['price'],];
		
		$tx_splits[] = ['account_id' => Account::SPECIAL_TAX,
		                'tx_type'    => 'credit',
		                'amount'     => $new_total['tax'],];
		
		if ($new_total['discount'] > 0) {
			$tx_splits[] = ['account_id' => Account::SPECIAL_DISCOUNT,
			                'tx_type'    => 'debt',
			                'amount'     => $new_total['discount'],];
		}
		
		//        $tx_splits[] = array(
		//            'account_id' => 'future_debt',
		//            'tx_type' => 'debt',
		//            'amount' => '0.01'
		//        );
		//
		//        $tx_splits[] = array(
		//            'account_id' => 'points_cash',
		//            'tx_type' => 'credit',
		//            'amount' => '0.01'
		//        );
		//        $newDate = new WTDate();
		
		/**
		 * sıralı voucher_num üretmek için mekanizma üretilecek
		 */
		$data = ['currency_id'       => 1,
		         'voucher_num'       => random_int(1000, 9999),
		         'timestamp_created' => self::$date->GetDateFormattedForDB(),
		         'date'              => self::$date->GetDateFormattedForDB(),
		         'splits'            => $tx_splits,];
		
		$transaction = new Transaction();
		$transaction->setDb(self::$db);
		
		return $transaction->add($data)->transaction_id;
	}
	
	
	
	public static
	function getAccountAndTxTypeByPaymentType($payment_type_id): array
	{
		
		static $payment_types = null;
		$special_account_code = null;
		$tx_type              = null;
		
		if ($payment_types === null) {
			$payment_types = Type::getBy(['groupname' => 'payment_type'], false);
		}
		
		
		foreach ($payment_types as $payment_type) {
			
			if ((int)$payment_type->type_id !== (int)$payment_type_id) {
				continue;
			}
			switch ($payment_type->name) {
				case 'cash':
					$special_account_code = Account::SPECIAL_CASH;
					$tx_type              = 'debt';
					break 2;
				
				case 'card_fund':
					$special_account_code = Account::SPECIAL_CARD_FUND;
					$tx_type              = 'debt';
					break 2;
				
				case'points_cash':
					$special_account_code = Account::SPECIAL_POINTS_CASH;
					$tx_type              = 'debt';
					break 2;
				
				case'credit_card':
					$special_account_code = Account::SPECIAL_CREDIT_CARD;
					$tx_type              = 'debt';
					break 2;
				
				case'instalment':
					$special_account_code = Account::SPECIAL_INSTALMENT;
					$tx_type              = 'debt';
					break 2;
				
				case'sales_credit':
					$special_account_code = Account::SPECIAL_SALES_CREDIT;
					$tx_type              = 'debt';
					break 2;
			}
			
			
		}
		
		$special_account = Account::getSpecialAccount($special_account_code);
		if (!$special_account) {
			throw new Exception("Special account code `$special_account_code` is not matched with any account.");
		}
		
		return ['account_id'           => $special_account->account_id,
		        'tx_type'              => $tx_type,
		        'special_account_code' => $special_account_code,];
		
	}
	
	
	
	private static
	function processSale($post, $inspector, $transaction_id): void
	{
		
		$new_total = $inspector->new_total;
		$total     = $inspector->total;
		
		$sale = new CashSale();
		$sale->setDb(self::$db);
		$saleRecord = $sale->getRecordObject();
		
		self::$saleRecord = $saleRecord;
		
		$saleRecord->transaction_id = $transaction_id;
		/**
		 * fixme: staff id satıs ekranında gelecek suan için manuel atıyoruz
		 * voucher_num ve description sale ekrannıdan staff ide ile birlikte gönderilecek
		 * ayrica voucher num == sales slip
		 */
		$saleRecord->staff_id      = Session::user()->staff_id;
		$saleRecord->client_id     = self::$client->client_id;
		$saleRecord->enterprise_id = Session::user()->enterprise_id;
		$saleRecord->till_id       = Session::user()->till_id;
		$saleRecord->branch_id     = Session::user()->branch_id;
		$saleRecord->total         = $new_total['price'];
		$saleRecord->tax           = $new_total['tax'];
		$saleRecord->grand         = $new_total['grand'];
		$saleRecord->discount      = $total['price'] - $new_total['price'];
		
		foreach ($inspector->saleitems as $saleitem) {
			$SaleItemRecord = new SaleSaleItemRecord();
			$SaleItemRecord->setDb(self::$db);
			$SaleItemRecord->loadFrom($saleitem);
			$saleRecord->addSaleItem($SaleItemRecord);
		}
		
		/**
		 * we should pass-in an empty array.
		 */
		$saleRecord->add();
		
	}
	
	
	
	private static
	function processCurrentSplits($transaction_id): void
	{
		foreach (self::$current_splits as $split) {
			
			$current = new CurrentRecord();
			$current->setDb(self::$db);
			
			$current->client_id      = self::$client->client_id;
			$current->transaction_id = $transaction_id;
			$current->sale_id        = self::$saleRecord->sale_id;
			$current->date           = self::$date->GetDateFormattedForDB();
			$current->description    = 'Satış kredisi kullanımı';
			$current->debt           = $split['amount'];
			$current->add();
		}
	}
	
	
	
	private static
	function processInvoice($post): void
	{
		
		$invoice = new Invoice();
		$invoice->setDb(self::$db);
		$invoiceRecord = $invoice->getRecordObject();
		$invoiceRecord->loadFromSaleRecord(self::$saleRecord);
		
		
		$bill_type = Type::getBy(['name' => 'invoice', 'groupname' => 'bill_type']);
		
		$bill_direction_type = Type::getBy(['name' => 'sale', 'groupname' => 'bill_type_direction']);
		
		$invoiceRecord->datetime               = self::$date->GetDateFormattedForDB();
		$invoiceRecord->bill_type_id           = $bill_type->type_id;
		$invoiceRecord->bill_direction_type_id = $bill_direction_type->type_id;
		
		if (self::$client->person_id) {
			$invoiceRecord->person_id = self::$client->person_id;
			$invoiceRecord->tckn      = $post['invoice_recipient']['tckn'];
		}
		
		if (self::$client->entity_id) {
			$invoiceRecord->entity_id  = self::$client->entity_id;
			$invoiceRecord->tax_num    = $post['invoice_recipient']['tax_num'];
			$invoiceRecord->tax_office = $post['invoice_recipient']['tax_office'];
		}
		$invoiceRecord->bill_to         = $post['invoice_recipient']['bill_to'];
		$invoiceRecord->billing_address = $post['invoice_recipient']['billing_address'];
		/**
		 * todo: Shipping address is to be implemented!!
		 */
		$invoiceRecord->shipping_address = null;
		$invoiceRecord->add();
		
	}
	
	
	
	private static
	function processPoints(CouponInspectorResult $inspector, array $splits): void
	{
		$pointValueRecord = PointValue::getActivePointValue();
		
		if (!$pointValueRecord) {
			throw new Exception('Please Set Enterprise Point value!!!');
		}
		$pointRecord = new PointRecord();
		$pointRecord->setDb(self::$db);
		$pointRecord->client_id = self::$saleRecord->client_id;
		
		$saleitems = $inspector->saleitems;
		foreach ($saleitems as $saleitem) {
			
			if (!array_key_exists('point', $saleitem)) {
				continue;
			}
			$pointRecord->coupon_id = $saleitem['coupon_id'];
			
			$pointRecord->points_earned = $saleitem['point'];
			
			$pointRecord->sale_id        = self::$saleRecord->sale_id;
			$pointRecord->point_value_id = $pointValueRecord->point_value_id;
			$pointRecord->money_earned   = $pointRecord->points_earned * $pointValueRecord->value;
			$pointRecord->card_id        = 1;
			$pointRecord->add();
		}
		$shopping_total = CouponProcessor::getPoints('shopping');
		
		foreach ($shopping_total as $total) {
			
			$pointRecord->coupon_id      = $total['coupon_id'];
			$pointRecord->points_earned  = $total['point'];
			$pointRecord->sale_id        = self::$saleRecord->sale_id;
			$pointRecord->point_value_id = $pointValueRecord->point_value_id;
			$pointRecord->money_earned   = $pointRecord->points_earned * $pointValueRecord->value;
			$pointRecord->card_id        = null; // fixme: card_id should be coming from client-side.
			$pointRecord->add();
		}
		foreach ($splits as $split) {
			
			$splitType = Type::getBy(['type_id' => $split->getTypeId()]);
			if ($splitType->name !== Account::SPECIAL_POINTS_CASH) {
				continue;
			}
			
			$pointRecord->points_spent   += $split->amount;
			$pointRecord->money_spent    += $pointRecord->points_spent * $pointValueRecord->value;
			$pointRecord->sale_id        = self::$saleRecord->sale_id;
			$pointRecord->point_value_id = $pointValueRecord->point_value_id;
			$pointRecord->card_id        = 1;
			$pointRecord->add();
		}
		
		
	}
	
	
	
	private static
	function addClientPackageItem($sale_items): void
	{
		$package_items = [];
		$packageType   = Type::getBy(['name' => 'package', 'groupname' => 'saleitem_type']);
		foreach ($sale_items as $sale_item) {
			if ($sale_item['saleitem']['type_id'] !== $packageType->type_id) {
				continue;
			}
			
			if ($sale_item['saleitem']['is_partial'] === null) {
				continue;
			};
			
			$package_items['client_id']   = self::$saleRecord->client_id;
			$package_items['sale_id']     = self::$saleRecord->sale_id;
			$package_items['saleitem_id'] = $sale_item['saleitem']['saleitem_id'];
			$package_items['qty']         = $sale_item['qty'];
			
			$sql = WTDbUtils::getInsertQuery('client_package', $package_items);
			self::$db->execInsert($sql, 'client_package');
		}
	}
	
	
	
	private static
	function processCurrent($post, $inspector, $transaction_id)
	{
		$arr = [['debt' => $inspector->new_total['grand'], 'credit' => null, 'description' => 'Satış'],
		        ['debt' => null, 'credit' => $inspector->new_total['grand'], 'description' => 'Ödeme'],];
		
		foreach ($arr as $item) {
			
			$current = new CurrentRecord();
			$current->setDb(self::$db);
			
			$current->client_id      = self::$client->client_id;
			$current->transaction_id = $transaction_id;
			$current->sale_id        = self::$saleRecord->sale_id;
			$current->date           = self::$date->GetDateFormattedForDB();
			$current->description    = $item['description'];
			$current->debt           = $item['debt'];
			$current->credit         = $item['credit'];
			$current->add();
		}
		
	}
}