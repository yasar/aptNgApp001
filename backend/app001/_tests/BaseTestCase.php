<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 26.03.2017
 * Time: 16:12
 */

namespace BYRWEB\app001\tests;

use BYRWEB\app999\user\User;
use BYRWEB\base\SecurityUtils;
use BYRWEB\base\WTDbUtils;
use PHPUnit\Framework\TestCase;

class BaseTestCase extends TestCase
{
    protected $db;
    protected $dbLog;
    
    public function setUp()
    {
        parent::setUp();
        
        $_SESSION = [];
        
        $path = '/var/www/nexus/backend/src';
        require $path . '/../vendor/autoload.php';
        define('WT_APP_NAME', 'app001');
        define('WT_SUPERUSER_LOGIN', 'superuser');
        define('WT_SUPERUSER_LICENSE_TYPE', 'full');
        require $path . '/BYRWEB/' . WT_APP_NAME . '/config.unittest.php';
        list($this->db, $this->dbLog) = include($path . '/db.php');
        
        WTDbUtils::$db    = $this->db;
        WTDbUtils::$dbLog = $this->dbLog;
        SecurityUtils::setDb($this->db);
        
        
        if (WT_LOGIN_REQUIRED) {
            $user = new User();
            $user->setDb($this->db);
            $user->login('demo', 'demo', '1-1-1');
            // $user->login(WT_SUPERUSER_LOGIN, 'nexus');
        }
    }
    
}
