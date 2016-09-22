<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 05.11.2015
 * Time: 13:16
 */

namespace BYRWEB\app001\point;

use BYRWEB\base\ADbRecord;

class PointValueRecord extends ADbRecord
{
    public $point_value_id;
    public $enterprise_id;
    public $value;
    public $end_date;
    public $is_active;
    public $timestamp;

    public function __construct()
    {
        $this->setTableName('point_value');
        $this->setPrimaryKey('point_value_id');
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

}

