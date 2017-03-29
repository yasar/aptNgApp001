<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 05.11.2015
 * Time: 13:02
 */

namespace BYRWEB\app001\point;

use BYRWEB\base\ADbObject;
use BYRWEB\base\WTDbUtils;

class Point extends ADbObject
{

    public function __construct()
    {
        $this->setRecordObject(new PointRecord());
    }

    public static function updateStats($client_id)
    {
        $db = WTDbUtils::$db;
        
        $sql = "select points_total from `app001.point`
              where client_id=$client_id ORDER BY `timestamp` DESC LIMIT 1";
        $sth = $db->query($sql);
        $row = $sth->fetch(\PDO::FETCH_ASSOC);
        $points_total = $row['points_total'];

        $sql = "UPDATE `app999.client_stats`
            SET total_points=$points_total
            WHERE client_id=$client_id";
        $db->execUpdate($sql);
    }

    /**
     * @param $filter
     * @param bool $singleRow
     * @param null $instance
     * @return PointRecord|PointRecord[]
     */
    public static function getBy($filter, $singleRow = true, $instance = null, $mode = 'find', array $order = [])
    {
        return parent::getBy($filter, $singleRow, $instance, $mode, $order);
    }


}