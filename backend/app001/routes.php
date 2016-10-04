<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 10.09.2016
 * Time: 15:58
 */

BYRWEB\app001\application\Route::initRoutes($app, $db);
BYRWEB\app001\card\Route::initRoutes($app, $db);
BYRWEB\app001\client\Route::initRoutes($app, $db);
BYRWEB\app001\clientCard\Route::initRoutes($app, $db);
BYRWEB\app001\coupon\Route::initRoutes($app, $db);
BYRWEB\app001\couponInspector\CouponInspector::initRoutes($app, $db);
BYRWEB\app001\couponCondition\Route::initRoutes($app, $db);
BYRWEB\app001\couponSubject\Route::initRoutes($app, $db);
BYRWEB\app001\couponRequirement\Route::initRoutes($app, $db);
BYRWEB\app001\couponReward\Route::initRoutes($app, $db);
BYRWEB\app001\couponTarget\Route::initRoutes($app, $db);
BYRWEB\app001\payment\Route::initRoutes($app, $db);
BYRWEB\app001\cashSale\Route::initRoutes($app, $db);
BYRWEB\app001\saleitem\Route::initRoutes($app, $db);
BYRWEB\app001\saleitemPackage\Route::initRoutes($app, $db);
BYRWEB\app001\saleitemPrice\Route::initRoutes($app, $db);
BYRWEB\app001\seller\Route::initRoutes($app, $db);
BYRWEB\app001\till\Route::initRoutes($app, $db);
/**
 * we have app002/image module as well.
 * we shoudl change the db table name from `app002.image` to `image` then
 * remove the app002/image module. so that we will only use one module which is `image`.
 *
 * for now, use them as separate.
 */
BYRWEB\app999\image\Route::initRoutes($app, $db);

BYRWEB\app900\account\Route::initRoutes($app, $db);
BYRWEB\app900\current\Route::initRoutes($app, $db);
BYRWEB\app900\transaction\Route::initRoutes($app, $db);
BYRWEB\app900\purchase\Route::initRoutes($app, $db);
BYRWEB\app900\sale\Route::initRoutes($app, $db);
BYRWEB\app900\invoice\Route::initRoutes($app, $db);
BYRWEB\app900\purchaseItem\Route::initRoutes($app, $db);

BYRWEB\app901\message\Route::initRoutes($app, $db);
BYRWEB\app901\messageTarget\Route::initRoutes($app, $db);
BYRWEB\app901\messageTargetGroup\Route::initRoutes($app, $db);

BYRWEB\app902\appointment\Route::initRoutes($app, $db);

BYRWEB\app903\reminder\Route::initRoutes($app, $db);

BYRWEB\app999\accessLevel\Route::initRoutes($app, $db);
BYRWEB\app999\accessRight\Route::initRoutes($app, $db);
BYRWEB\app999\address\Route::initRoutes($app, $db);
BYRWEB\app999\branch\Route::initRoutes($app, $db);
BYRWEB\app999\entity\Route::initRoutes($app, $db);
BYRWEB\app999\person\Route::initRoutes($app, $db);
BYRWEB\app999\setting\Route::initRoutes($app, $db);
BYRWEB\app999\staff\Route::initRoutes($app, $db);
BYRWEB\app999\user\Route::initRoutes($app, $db);
BYRWEB\app999\signup\Route::initRoutes($app, $db);

BYRWEB\lup\brand\Route::initRoutes($app, $db);
BYRWEB\lup\clientGroup\Route::initRoutes($app, $db);
BYRWEB\lup\position\Route::initRoutes($app, $db);
BYRWEB\lup\documentType\Route::initRoutes($app, $db);
BYRWEB\lup\currency\Route::initRoutes($app, $db);
BYRWEB\lup\department\Route::initRoutes($app, $db);
BYRWEB\lup\staffGroup\Route::initRoutes($app, $db);
BYRWEB\lup\clientGroup\Route::initRoutes($app, $db);
BYRWEB\lup\location\Route::initRoutes($app, $db);
//    \BYRWEB\lup\Location::initRoutes($app, $db);
BYRWEB\lup\profession\Route::initRoutes($app, $db);
BYRWEB\lup\premium\Route::initRoutes($app, $db);
BYRWEB\lup\tax\Route::initRoutes($app, $db);
BYRWEB\lup\model\Route::initRoutes($app, $db);
BYRWEB\lup\type\Route::initRoutes($app, $db);
BYRWEB\lup\typeGroup\Route::initRoutes($app, $db);
BYRWEB\lup\saleitemGroup\Route::initRoutes($app, $db);
BYRWEB\lup\saleitemUnit\Route::initRoutes($app, $db);
BYRWEB\lup\template\Route::initRoutes($app, $db);

BYRWEB\contact\Route::initRoutes($app, $db);
BYRWEB\cronjob\Route::initRoutes($app, $db);
BYRWEB\file\File::initRoutes($app, $db);
BYRWEB\nexus\Appointment::initRoutes($app, $db);

