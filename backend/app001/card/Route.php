<?php

namespace BYRWEB\app001\card;


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


            $Route->app->post('/import', function () use ($Route) {
                $post = json_decode(file_get_contents("php://input", true));
                $return = $Route->getDbObject()->import($post);
                echo $return === false ? 'false' : json_encode($return);
            });
        };

        $app->group('/app001/card', self::getStandardRouteMap(__NAMESPACE__ . '\Card', $app, $db, $customRoutesFn));


    }


    /**
     * @return Card
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}