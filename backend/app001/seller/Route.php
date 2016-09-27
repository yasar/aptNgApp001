<?php

namespace BYRWEB\app001\seller;


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

            $Route->app->group('/:sellerId', function () use ($Route) {


                /**
                 * make sure this is required
                 */
                $Route->app->get('/overviewProfile', function ($sellerId) use ($Route) {
                    $return = $Route->getDbObject()->getProfile($sellerId, 'overview');
                    echo $return === false ? 'false' : json_encode($return);
                });



            });
        };

        $app->group('/app001/seller', self::getStandardRouteMap(__NAMESPACE__ . '\Seller', $app, $db, $customRoutesFn));


    }


    /**
     * @return Seller
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}