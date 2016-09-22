<?php
namespace BYRWEB\app001\application;

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

    public static function initRoutes2($app, $db)
    {
        /**
         * @param Route $Route
         */
        $customRoutesFn = function ($Route) {

        };

        $app->group('/app001/application', self::getStandardRouteMap(__NAMESPACE__ . '\Application', $app, $db, $customRoutesFn));
    }

    public static function initRoutes($app, $db)
    {

        $app->group('/app001/application', function () use ($app, $db) {
            Application::$db = $db;
//            $Application = new Application();
//            $Application->setDb($db);

            $app->get('', function () use ($app) {
                $return = Application::getApplications($app->request->get('group_name'));
                echo json_encode($return);
            });

            $app->post('/:id', function () use ($app, $db) {
                $post = json_decode(file_get_contents("php://input"), true);
                $row_nr = Application::getRowNr($post['app_id']);
                Application::processPost($post);
                echo json_encode(Application::getData($post['app_id'], $row_nr));
            });

            $app->group('/:id', function () use ($app) {

                $app->get('', function ($app_id) use ($app) {
                    echo json_encode(Application::getAllData($app_id));
                });

                $app->get('/:row_nr', function ($app_id, $row_nr) use ($app) {
                    echo json_encode(Application::getData($app_id, $row_nr));
                });

                $app->put('/:row_nr', function ($app_id, $row_nr) use ($app) {
                    $post = json_decode($app->request()->getBody());
                    $post['app_id'] = $app_id;
                    Application::processUpdate($post);
                    echo json_encode(Application::getData($app_id, $row_nr));
                });

                $app->delete('/:row_nr', function ($app_id, $row_nr) use ($app) {
                    $return =    Application::processDelete($app_id, $row_nr);

                    echo $return == true ? $return : 'false';
                });

            });

        });

    }


}