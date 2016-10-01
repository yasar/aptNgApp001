<?php

namespace BYRWEB\app001\couponTarget;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use BYRWEB\coupon\CouponTarget;
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

        $app->group('/app001/couponTarget', self::getStandardRouteMap(__NAMESPACE__ . '\CouponTarget', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponTarget
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}