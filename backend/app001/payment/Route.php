<?php

namespace BYRWEB\app001\payment;




use BYRWEB\base\AjaxReturn;
use BYRWEB\base\ARoute;
use BYRWEB\base\ISlimRouteProvider;
use BYRWEB\base\NestedPDO;
use Slim\Slim;


class Route implements ISlimRouteProvider
{
	public static
	function initRoutes($app, $db)
	{
		$app->group('/app001/payment', function () use ($app, $db) {
			$app->post('/process', function () use ($db) {
				$AR = new AjaxReturn();
				try {
					$post        = json_decode(file_get_contents("php://input"), true);
					Payment::$db = $db;
					$return      = Payment::process($post);
					//		            echo $return === false ? -1 : json_encode($return);
					$AR->success = $return;
				}
				catch (\Exception $e) {
					$AR->success       = false;
					$AR->error_message = $e->getMessage();
				}
				
				echo $AR;
			});
		});
	}
}

//class Route extends ARoute implements ISlimRouteProvider
//{
//    public static function initRoutes($app, $db)
//    {
//        $customRoutesFn = function ($Route) {
////            $Route->app->group('', function () use ($Route) { });
//
//            $Route->app->post('/process', function () use ($Route) {
//                $post = json_decode(file_get_contents("php://input"), true);
//                $return = Payment::process($post);
//                echo $return === false ? 'false' : json_encode($return);
//            });
//        };
//
//        $app->group('/app001/payment', self::getStandardRouteMap(__NAMESPACE__ . '\Payment', $app, $db, $customRoutesFn));
//    }
//
//
//    /**
//     * @return Payment
//     */
//    public function getDbObject()
//    {
//        return parent::getDbObject();
//    }
//
//}