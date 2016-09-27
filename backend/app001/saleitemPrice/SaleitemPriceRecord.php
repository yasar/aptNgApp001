<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\saleitemPrice;


use BYRWEB\app001\price\PriceRecord;
use BYRWEB\base\ADbRecord;


class SaleitemPriceRecord extends ADbRecord
{

    public $saleitem_price_id, $saleitem_id, $price_type_id, $is_active, $price_id,
        $__is_incomplete, $timestamp, $enterprise_id, $is_deleted,$is_primary;

    /**
     * @var $price PriceRecord
     */
    public $price;

    public function __construct()
    {
        $this->setTableName('saleitem_price');
        $this->setPrimaryKey('saleitem_price_id');
        $this->setSqlQuery(file_get_contents(__DIR__ . '/sql/get.sql'));
        $this->setSqlQueryFind(file_get_contents(__DIR__ . '/sql/list.sql'));
        $this->required_incomplete_fields = ['saleitem_id', 'price_type_id', 'price_id'];
        $this->excluded_update_fields = ['saleitem_id', 'price_id'];
    }

    public function loadPrice()
    {
        $this->price = new PriceRecord();
        $this->price->setDb($this->getDb());
        $this->price->setPrimaryValue($this->price_id);
        $this->price->load();
    }

}

