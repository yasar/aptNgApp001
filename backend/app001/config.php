<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 10.09.2016
 * Time: 16:06
 */

use BYRWEB\base\Enum;

define('WT_APP_LANG', 'tr');
define('WT_MCRYPT_KEY', 'Gt3597{zq`F-|(70])_=Kfgd!jB!6H');
define('WT_SITE_ID', 0);
define('WT_ENABLE_LOG', true);
define('WT_ENABLE_LOGIN_FAILURE_CHECK', false);
define('WT_LOGIN_WITH_EBT', false);
define('APP_MODE', Enum::APP_MODE_SHARED);


list($login_required, $license_required) = getRequiredFlags();
define('WT_LOGIN_REQUIRED', $login_required);
define('WT_LICENSE_REQUIRED', $license_required);


$app_version = getenv('HTTP_WT_APP_VERSION');

define('DEBUG', array_key_exists('XDEBUG_SESSION_START', $_GET) || array_key_exists('XDEBUG_SESSION', $_COOKIE));
define('WT_APP_DOMAIN', str_replace('www.', '', $_SERVER['HTTP_HOST']));
if ($app_version) {
    define('WT_BASE', $_SERVER['DOCUMENT_ROOT'] . '/' . $app_version);
    define('WT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/' . $app_version . '/backend/src/BYRWEB');
} else {
    define('WT_BASE', $_SERVER['DOCUMENT_ROOT']);
    define('WT_PATH', $_SERVER['DOCUMENT_ROOT'] . '/backend/src/BYRWEB');
}

function getRequiredFlags()
{
    $login = true;
    $license = false;

    if (strpos($_SERVER['REQUEST_URI'], 'login')) {
        $login = $login && false;
        $license = $license && true;
    } else if (strpos($_SERVER['REQUEST_URI'], 'logout')) {
        $login = $login && false;
        $license = $license && false;
    } else if (strpos($_SERVER['REQUEST_URI'], 'signup')) {
        $login = $login && false;
        $license = $license && false;
    } else if (strpos($_SERVER['REQUEST_URI'], 'activate')) {
        $login = $login && false;
        $license = $license && false;
    } else {
        $login = $login && true;
        $license = $license && true;
    }

    return [$login, $license];
}