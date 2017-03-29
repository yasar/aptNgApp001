<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\saleitem;


use BYRWEB\base\ADbRecord;
use BYRWEB\base\SqlObject;

class SaleitemRecord extends ADbRecord
{

    public $saleitem_id, $enterprise_id, $type_id, $group_id, $brand_id, $model_id, $code, $barcode, $name,
        $unit_id, $is_favorite, $favorite_order, $shortcut_key, $stock, $is_stock_enabled,
        $bonus_percentage, $is_time_limited, $valid_for, $expiration_date,
        $week_days, $is_partial, $__is_incomplete;

    public $type_name, $group_name, $model_name, $brand_name;


    public function __construct()
    {
        parent::__construct();
        
        $this->setTableName('`app001.saleitem`');
        $this->setPrimaryKey('saleitem_id');
        $this->setSearchableFields(['name']);
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/browse.sql')), SqlObject::SQL_FOR_BROWSE);
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/listing.sql')), SqlObject::SQL_FOR_LISTING);
        $this->setSqlQuery(new SqlObject(file_get_contents(__DIR__ . '/sql/get.sql')), SqlObject::SQL_FOR_GET);
    }

}

