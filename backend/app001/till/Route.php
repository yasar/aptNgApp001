<?php

namespace BYRWEB\app001\till;


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

        };

        $app->group('/app001/till', self::getStandardRouteMap(__NAMESPACE__ . '\Till', $app, $db, $customRoutesFn));


    }


    /**
     * @return Till
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}