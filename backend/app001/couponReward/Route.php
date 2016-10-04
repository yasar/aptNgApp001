<?php

namespace BYRWEB\app001\couponReward;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use BYRWEB\coupon\CouponReward;
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

        $app->group('/app001/couponReward', self::getStandardRouteMap(__NAMESPACE__ . '\CouponReward', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponReward
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}