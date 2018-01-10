<?php


namespace BYRWEB\app001\cardFund;




use BYRWEB\app900\account\Account;
use BYRWEB\app900\current\CurrentRecord;
use BYRWEB\app900\transaction\TransactionRecord;
use BYRWEB\base\ARoute;
use BYRWEB\base\NestedPDO;
use BYRWEB\base\WTDate;
use Slim\Slim;


class Route extends ARoute
{
	
	/**
	 * @param $app Slim
	 * @param $db  NestedPDO
	 *
	 */
	
	public static
	function initRoutes($app, $db): void
	{
		/**
		 * @param Route $Route
		 */
		$customRoutesFn = function ($Route) { };
		
		$app->group('/app001/cardFund', self::getStandardRouteMap(__NAMESPACE__
		                                                          . '\CardFund', $app, $db, $customRoutesFn));
		
		
		$app->hook('route.' . CardFund::class . '.after.addRecord',
			
			function ($data, CardFundRecord $record) {
				
				$transaction_              = new TransactionRecord();
				$transaction_->date        = $record->date;
				$transaction_->description = 'Kart para işlemi (card_id: ' . $record->card_id . ')';
				$transaction_->voucher_num = random_int(1000, 9999);
				$transaction_->currency_id = 1;
				$transaction_->splits      = ['account_id' => Account::SPECIAL_CARD_FUND,
				                              'tx_type'    => $record->deposit ? 'credit' : 'debt',
				                              'amount'     => $record->deposit ?? $record->withdraw];
				if ($transaction_->add()) {
					$current_                 = new CurrentRecord();
					$current_->client_id      = $record->client_id;
					$current_->date           = $record->date;
					$current_->credit         = $record->deposit;
					$current_->debt           = $record->withdraw;
					$current_->description    = 'Kart para işlemi (card_id: ' . $record->card_id . ')';
					$current_->transaction_id = $transaction_->transaction_id;
					$result                   = $current_->add();
				}
				
			});
	}
	
	
}
