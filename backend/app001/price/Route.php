<?php

namespace BYRWEB\price;


use BYRWEB\app001\price\Price;
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

        $app->group('/app900/price', self::getStandardRouteMap(__NAMESPACE__ . '\Price', $app, $db, $customRoutesFn));


    }


    /**
     * @return Price
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}