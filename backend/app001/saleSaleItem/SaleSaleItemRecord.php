<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 28.05.2016
 * Time: 15:40
 */

namespace BYRWEB\app001\saleSaleItem;


use BYRWEB\app001\price\Price;
use BYRWEB\app001\price\PriceRecord;
use BYRWEB\app001\saleitem\SaleitemRecord;
use BYRWEB\base\ADbRecord;

class SaleSaleItemRecord extends ADbRecord
{
    public $sale_item_id;
    public $sale_id;
    public $saleitem_id;
    public $sale_price;
    public $sale_tax;
    public $sale_taxed_price;
    public $sale_discount;
    public $coupon_id;
    public $description;
    public $brand_id;
    public $model_id;
    public $group_id;
    public $unit_id;
    public $type_id;
    public $tax_percentage;
    public $qty;
    public $price_id;
    public $base_price;
    public $currency_id;
    public $currency_rate;

    /**
     * sale invoice için saleitemların original fiyatlarını
     * doldurmak için tanımlandı.
     */
//    public $originalPrice;

    public $saleitem;

    public function __construct()
    {
        $this->setTableName('sale_item');
        $this->setPrimaryKey('sale_item_id');
        $this->uses_enterprise_id = false;
        $this->setSqlQueryFind(file_get_contents(__DIR__ . '/sql/get.sql'));

    }

    public function loadFrom($data)
    {
        if (array_key_exists('has_coupon', $data) && array_key_exists('new_price', $data)) {
            $this->coupon_id        = $data['coupon_id'];
            $this->sale_price       = $data['new_price']['base_price'];
            $this->sale_tax         = $data['new_price']['tax'];
            $this->sale_taxed_price = $data['new_price']['taxed_price'];
            $this->sale_discount    = $data['saleitem']['base_price'] - $data['new_price']['base_price'];
            $this->description      = 'kupon indirimi';


        } else if (array_key_exists('exempt', $data)) {
            $this->sale_price       = $data['newPrice']['basePrice'];
            $this->sale_tax         = $data['newPrice']['tax'];
            $this->sale_taxed_price = $data['newPrice']['taxedPrice'];
            $this->sale_discount    = $data['saleitem']['base_price'] - $data['newPrice']['basePrice'];
            $this->description      = 'özel indirim';

        } else {
            $this->sale_price       = $data['saleitem']['base_price'];
            $this->sale_tax         = $data['saleitem']['tax'];
            $this->sale_taxed_price = $data['saleitem']['taxed_price'];
        }


        $this->saleitem_id    = $data['saleitem']['saleitem_id'];
        $this->brand_id       = $data['saleitem']['brand_id'];
        $this->model_id       = $data['saleitem']['model_id'];
        $this->group_id       = $data['saleitem']['group_id'];
        $this->unit_id        = $data['saleitem']['unit_id'];
        $this->type_id        = $data['saleitem']['type_id'];
        $this->tax_percentage = $data['saleitem']['tax_percentage'];


        $this->qty           = $data['qty'];
        $this->price_id      = $data['saleitem']['price_id'];
        $this->currency_id   = $data['saleitem']['currency_id'];
        $this->currency_rate = $data['currency_rate'];


//        $saleitem_original = PriceManager::get($data['saleitem']['price_id']);
//        $this->base_price = $saleitem_original['base_price'];

        $original_price   = Price::getBy(['price_id' => $data['saleitem']['price_id']]);
        $this->base_price = $original_price->base_price;
    }

//    public function loadOriginalPrice()
//    {
//        $this->originalPrice = new PriceRecord();
//        $this->originalPrice->setDb($this->getDb());
//        $this->originalPrice->setPrimaryValue($this->price_id);
//        $this->originalPrice->load();
//    }

    public function loadSaleitem()
    {
        $this->saleitem = new SaleitemRecord();
        $this->saleitem->setDb($this->getDb());
        $this->saleitem->setPrimaryValue($this->saleitem_id);

        ///

//        $sql = file_get_contents(__DIR__ . '/../saleitem/sql/browse.sql');
        $sql = file_get_contents(__DIR__ . '/../saleitem/sql/saleInvoiceEdit.sql');
        $sql = "select * from ($sql where _.price_id={$this->price_id}) as _ ";

        ///

        $this->saleitem->setSqlQuery($sql);
        $this->saleitem->load();

    }

}