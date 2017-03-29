<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 05.11.2015
 * Time: 13:16
 */

namespace BYRWEB\app001\point;

use BYRWEB\base\ADbObject;
use BYRWEB\base\SecurityUtils;
use BYRWEB\base\WTDbUtils;
use BYRWEB\common\Session;

class PointValue extends ADbObject
{

    public function __construct()
    {
        $this->setRecordObject(new PointValueRecord());
    }


//    public function load()
//    {
//        $enterprise_id = Session::user()->enterprise_id;
//        $sql = "SELECT * FROM point_value where enterprise_id=$enterprise_id and is_active=1";
//        $sth = $this->db->query($sql);
//        $row = $sth->fetch(\PDO::FETCH_ASSOC);
//
//        $this->loadFromArray($row);
//
//    }

    /**
     * @return PointValueRecord
     */
    public static function getActivePointValue()
    {
        $db = WTDbUtils::$db;
        $sql = "select * from `app001.point_value` where is_active=1 and end_date is null and "
            . SecurityUtils::getEnterpriseSecurityForQuery(true, false, '');
        $sth = $db->query($sql);
        return $sth->fetchObject( __NAMESPACE__.'\PointValueRecord');
    }

}

