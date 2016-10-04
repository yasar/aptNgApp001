<?php

namespace BYRWEB\app001\couponCondition;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use BYRWEB\coupon\CouponCondition;
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


                $Route->app->get('/:couponId/overview', function ($couponId) use ($Route) {
                    $return = $Route->getDbObject()->getOverview($couponId);
                    echo $return === false ? 'false' : json_encode($return);
                });


            });
        };

        $app->group('/app001/couponCondition', self::getStandardRouteMap(__NAMESPACE__ . '\CouponCondition', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponCondition
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}