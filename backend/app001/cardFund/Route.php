<?php


namespace BYRWEB\app001\cardFund;




use BYRWEB\base\ARoute;
use BYRWEB\base\NestedPDO;
use Slim\Slim;


class Route extends ARoute
{
	
	/**
	 * @param $app Slim
	 * @param $db  NestedPDO
	 */
	
	public static
	function initRoutes($app, $db)
	{
		/**
		 * @param Route $Route
		 */
		$customRoutesFn = function ($Route) {
			
			
			//			$Route->app->get('/:purchase_id/items', function ($purchase_id) use ($Route) {
			//				$Route->getDbObject()
			//				      ->getRecordObject()
			//				      ->setPrimaryValue($purchase_id);
			//				$return = $Route->getDbObject()
			//				                ->getItems();
			//				echo $return === false ? 'false' : json_encode($return);
			//			});
		};
		
		$app->group('/app001/cardFund', self::getStandardRouteMap(__NAMESPACE__
		                                                          . '\CardFund', $app, $db, $customRoutesFn));
		
		
	}
	
	
}
