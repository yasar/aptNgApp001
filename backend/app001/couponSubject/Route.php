<?php

namespace BYRWEB\app001\couponSubject;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use BYRWEB\coupon\CouponSubject;
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

        $app->group('/app001/couponSubject', self::getStandardRouteMap(__NAMESPACE__ . '\CouponSubject', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponSubject
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}