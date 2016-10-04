<?php

namespace BYRWEB\app001\saleitemPackage;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use Slim\Slim;

class Route extends ARoute implements ISlimRouteProvider
{
    /**
     * @param $app Slim
     * @param $db NestedPDO
     */


    /**
     * @param $app Slim
     * @param $db NestedPDO
     */

    public static function initRoutes($app, $db)
    {
        /**
         * @param Route $Route
         */
        $customRoutesFn = function ($Route) {


            $Route->app->group('', function () use ($Route) {

            });
        };

        $app->group('/app001/saleitemPackage', self::getStandardRouteMap(__NAMESPACE__ . '\SaleitemPackage', $app, $db, $customRoutesFn));


    }


    /**
     * @return SaleitemPackage
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}