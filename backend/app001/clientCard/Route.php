<?php

namespace BYRWEB\app001\clientCard;


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

    public static function initRoutes($app, $db)
    {
        /**
         * @param Route $Route
         */
        $customRoutesFn = function ($Route) {
        };

        $app->group('/app001/clientCard', self::getStandardRouteMap(__NAMESPACE__ . '\ClientCard', $app, $db, $customRoutesFn));


    }


    /**
     * @return ClientCard
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}