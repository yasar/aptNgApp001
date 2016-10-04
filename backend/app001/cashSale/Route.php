<?php

namespace BYRWEB\app001\cashSale;


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
    public static function initRoutes($app, $db)
    {
        $app->group('/app001/cashSale', function () use ($app) {
            $dbObject = new CashSale();

            $app->get('/widget/dashboard', function () use ($dbObject) {
                $return = $dbObject->widgetForDashboard();
                echo json_encode($return);
            });
        });

    }


    /**
     * @return CashSaleRecord
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}