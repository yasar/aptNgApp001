<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\saleitemPackage;


use BYRWEB\base\ADbRecord;

class SaleitemPackageRecord extends ADbRecord
{
    public $saleitem_package_id,$package_id, $saleitem_id, $qty, $is_partial;



    public function __construct()
    {
        $this->setTableName('saleitem_package');
        $this->setPrimaryKey('saleitem_package_id');
        $this->setSqlQuery(file_get_contents(__DIR__.'/sql/get.sql'));

        $this->setSqlQueryFind(file_get_contents(__DIR__.'/sql/listing.sql'));

    }

}

