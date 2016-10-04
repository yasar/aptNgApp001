<?php

namespace BYRWEB\app001\client;


use BYRWEB\app001\clientCard\ClientCardRecord;
use BYRWEB\base\ARoute;
use BYRWEB\base\Exception;
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

            $Route->app->get('/widget/dashboard', function () use ($Route) {
                $return  = $Route->getDbObject()->widgetForDashboard();
                echo json_encode($return);
            });
            

            $Route->app->get('/getByCardNr', function () use ($Route) {
                $card_nr = $Route->app->request->get('card_nr');
                $return  = $Route->getDbObject()->getByCardNr($card_nr);
                echo json_encode($return);
            });

            $Route->app->group('/:clientId', function () use ($Route) {

                $Route->app->group('/card', function () use ($Route) {

                    $Route->app->get('', function ($clientId) use ($Route) {
                        echo json_encode($Route->getDbObject()->getCardList($clientId));
                    });

                    $Route->app->delete('/:client_card_id', function ($clientId, $client_card_id) use ($Route) {
                        $cc = new ClientCardRecord();
                        $cc->setDb($Route->getDbObject()->getDb());
                        $cc->setPrimaryValue($client_card_id);
                        $cc->delete();
                        echo 'true';
                    });
                });


                $Route->app->get('/invoiceProfile', function ($clientId) use ($Route) {
                    $return = $Route->getDbObject()->getInvoiceProfile($clientId);
                    echo $return === false ? 'false' : json_encode($return);
                });

                $Route->app->get('/saleProfile', function ($clientId) use ($Route) {
                    $return = $Route->getDbObject()->getProfile($clientId, 'sale');
                    echo $return === false ? 'false' : json_encode($return);
                });

                /**
                 * make sure this is required
                 */
                $Route->app->get('/overviewProfile', function ($clientId) use ($Route) {
                    $return = $Route->getDbObject()->getProfile($clientId, 'overview');
                    echo $return === false ? 'false' : json_encode($return);
                });

                $Route->app->get('/saleHistory', function ($clientId) use ($Route) {
                    $return = $Route->getDbObject()->getSaleHistory($clientId);
                    echo $return === false ? 'false' : json_encode($return);
                });


            });
        };

        $app->group('/app001/client', self::getStandardRouteMap(__NAMESPACE__ . '\Client', $app, $db, $customRoutesFn));


    }


    /**
     * @return Client
     */
    public function getDbObject()
    {
        return parent::getDbObject();
    }

}