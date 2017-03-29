<?php
/**
 * Created by IntelliJ IDEA.
 * User: Murat
 * Date: 30.04.2016
 * Time: 11:33
 */

namespace BYRWEB\app001\till;


use BYRWEB\base\ADbRecord;

class TillRecord extends ADbRecord
{
    
    public $till_id, $branch_id, $till, $security_code, $security_code2, $device_id, $account_id, $enterprise_id;
    
    
    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app999.till`');
        $this->setPrimaryKey('till_id');
    }
    
}

