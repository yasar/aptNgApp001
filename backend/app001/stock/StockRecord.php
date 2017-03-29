<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 18.11.2015
 * Time: 11:57
 */

namespace BYRWEB\app001\stock;


use BYRWEB\base\ADbRecord;

class StockRecord extends ADbRecord
{
    public $stock_id;
    public $qty;
    public $saleitem_id;
    public $enterprise_id;
    public $branch_id;
    
    
    public function __construct()
    {
        parent::__construct();
        $this->setTableName('stock');
        $this->setPrimaryKey('stock_id');
    }
}