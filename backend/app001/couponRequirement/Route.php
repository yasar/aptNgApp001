<?php

namespace BYRWEB\app001\couponRequirement;


use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use BYRWEB\coupon\CouponRequirement;
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

        $app->group('/app001/couponRequirement', self::getStandardRouteMap(__NAMESPACE__ . '\CouponRequirement', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponRequirement
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}