<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 10.09.2016
 * Time: 15:58
 */

BYRWEB\app001\application\Route::initRoutes($app, $db);
BYRWEB\app001\card\Route::initRoutes($app, $db);
BYRWEB\app001\cardFund\Route::initRoutes($app, $db);
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
BYRWEB\app999\client\Route::initRoutes($app, $db);
BYRWEB\app999\contact\Route::initRoutes($app, $db);
BYRWEB\app999\entity\Route::initRoutes($app, $db);
BYRWEB\app999\image\Route::initRoutes($app, $db);
BYRWEB\app999\my\Route::initRoutes($app, $db);
BYRWEB\app999\person\Route::initRoutes($app, $db);
BYRWEB\app999\setting\Route::initRoutes($app, $db);
BYRWEB\app999\signup\Route::initRoutes($app, $db);
BYRWEB\app999\staff\Route::initRoutes($app, $db);
BYRWEB\app999\type\Route::initRoutes($app, $db);
BYRWEB\app999\typeGroup\Route::initRoutes($app, $db);
BYRWEB\app999\user\Route::initRoutes($app, $db);

BYRWEB\app998\brand\Route::initRoutes($app, $db);
BYRWEB\app998\clientGroup\Route::initRoutes($app, $db);
BYRWEB\app998\position\Route::initRoutes($app, $db);
BYRWEB\app998\documentType\Route::initRoutes($app, $db);
BYRWEB\app998\currency\Route::initRoutes($app, $db);
BYRWEB\app998\department\Route::initRoutes($app, $db);
BYRWEB\app998\staffGroup\Route::initRoutes($app, $db);
BYRWEB\app998\clientGroup\Route::initRoutes($app, $db);
BYRWEB\app998\location\Route::initRoutes($app, $db);
BYRWEB\app998\profession\Route::initRoutes($app, $db);
BYRWEB\app998\premium\Route::initRoutes($app, $db);
BYRWEB\app998\tax\Route::initRoutes($app, $db);
BYRWEB\app998\model\Route::initRoutes($app, $db);
BYRWEB\app998\saleitemGroup\Route::initRoutes($app, $db);
BYRWEB\app998\saleitemUnit\Route::initRoutes($app, $db);
BYRWEB\app998\template\Route::initRoutes($app, $db);

BYRWEB\cronjob\Route::initRoutes($app, $db);
BYRWEB\file\File::initRoutes($app, $db);
BYRWEB\nexus\Appointment::initRoutes($app, $db);

