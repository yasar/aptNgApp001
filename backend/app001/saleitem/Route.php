<?php

namespace BYRWEB\app001\saleitem;




use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use Slim\Slim;


/**
 * Class Route
 *
 * @package BYRWEB\app001\saleitem
 * @method SaleitemRecord getDbObject()
 */
class Route extends ARoute implements ISlimRouteProvider
{
	/**
	 * @param $app Slim
	 * @param $db  NestedPDO
	 */
	
	
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
		$customRoutesFn = function ($Route, $db) {
			
			
			$Route->app->group('', function () use ($Route, $db) {
				
				$Route->app->get('/getByBarcode', function () use ($Route, $db) {
					$barcode = $Route->app->request->get('barcode');
					$Route->getModuleInstance()
					      ->setDb($db);
					$return = $Route->getDbObject()
					                ->getByBarcode($barcode);
					echo $return === false ? 'false' : json_encode($return);
				});
				
				$Route->app->get('/mostSoldSaleitem', function () use ($Route) {
					$filter = [];
					if ($Route->app->request->get('client_id')) {
						$filter['client_id'] = $Route->app->request->get('client_id');
					}
					$return = $Route->getDbObject()
					                ->getMostSoldSaleitem($filter);
					echo $return === false ? 'false' : json_encode($return);
				});
				
			});
		};
		
		$app->group('/app001/saleitem', self::getStandardRouteMap(__NAMESPACE__
		                                                          . '\Saleitem', $app, $db, $customRoutesFn));
		
		
	}
	
	
	//    /**
	//     * @return SaleitemRecord
	//     */
	//    public function getDbObject()
	//    {
	//        return parent::getDbObject();
	//    }
	
}