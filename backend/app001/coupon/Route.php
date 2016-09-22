<?php

namespace BYRWEB\app001\coupon;


use BYRWEB\app001\coupon\CouponRecord;
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


//            $Route->app->group('', function () use ($Route) {


            $Route->app->get('/:couponId/overview', function ($couponId) use ($Route) {
                $return = $Route->getDbObject()->getOverview($couponId);
                echo $return === false ? 'false' : json_encode($return);
            });

            $Route->app->get('/getApplicableStatuses', function () use ($Route) {
                $return = $Route->getDbObject()->getApplicableStatuses();
                echo $return === false ? 'false' : json_encode($return);
            });

            /**
             * bir sonraki surume ertelendi.
             * gerekli acıklama copuna.module line 198
             */
            /* $Route->app->get('/:couponId/checkValidity', function ($couponId) use ($Route) {
                 $return = $Route->getDbObject()->checkValidityCoupon($couponId);
                 echo $return === false ? 'false' : json_encode($return);
             });*/


//            });
        };

        $app->group('/app001/coupon', self::getStandardRouteMap(__NAMESPACE__ . '\Coupon', $app, $db, $customRoutesFn));


    }


    /**
     * @return CouponRecord
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}