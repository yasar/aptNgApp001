<?php

namespace BYRWEB\app001\saleitemPrice;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use Slim\Slim;

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

    public static function initRoutes($app, $db)
    {
        /**
         * @param Route $Route
         */
        $customRoutesFn = function ($Route) {

            $Route->app->put('/:saleitemPriceId/setPrimary', function ($saleitemPriceId) use ($Route) {
//            $Route->app->post('/:saleitemPriceId/setPrimary', function ($saleitemPriceId) use ($Route) {
                $return = $Route->getDbObject()->setPrimary($saleitemPriceId);
                echo $return === false ? 'false' : json_encode($return);
            });
        };

        $app->group('/app001/saleitemPrice', self::getStandardRouteMap(__NAMESPACE__ . '\SaleitemPrice', $app, $db, $customRoutesFn));


    }


    /**
     * @return SaleitemPrice
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}