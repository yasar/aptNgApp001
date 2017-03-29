<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\saleitemPackage;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class SaleitemPackageRecord extends ADbRecord
{
    public $saleitem_package_id, $package_id, $saleitem_id, $qty, $is_partial;
    
    
    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app001.saleitem_package`');
        $this->setPrimaryKey('saleitem_package_id');
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_GET);
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/listing.sql')), SqlObject::SQL_FOR_LISTING);
    }
    
}

