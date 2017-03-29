<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\seller;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class SellerRecord extends ADbRecord
{
    
    public $seller_id, $enterprise_id, $timestamp, $person_id, $entity_id, $registration_date, $notes,
        $is_deleted, $staff_id, $account_id, $__is_incomplete;
    
    
    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('seller');
        $this->setPrimaryKey('seller_id');
        $this->setSearchableFields(['name']);
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_GET);
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
    }
    
}

