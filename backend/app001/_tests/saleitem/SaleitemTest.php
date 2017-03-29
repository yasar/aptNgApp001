<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 26.03.2017
 * Time: 15:40
 */

namespace BYRWEB\app001\tests\saleitem;

require __DIR__ . '/../BaseTestCase.php';

use BYRWEB\app001\saleitem\Saleitem;
use BYRWEB\app001\saleitem\SaleitemRecord;
use BYRWEB\app001\tests\BaseTestCase;

class SaleitemTest extends BaseTestCase
{
    
    public function setUp()
    {
        parent::setUp();
    }
    
    public function test_SearchForCashSale_WillReturn_ItemsHavingPriceDetails()
    {
        $saleitem = new Saleitem();
        $saleitem->setDb($this->db);
        $saleitem->for = 'cashSale';
        $saleitems     = $saleitem->find(null, null, 1);
        $saleitem      = $saleitems[0];
        
        $this->assertInstanceOf(SaleitemRecord::class, $saleitem, 'Find() must return SaleItemRecord[]');
        $this->assertObjectHasAttribute('base_price', $saleitem, 'saleitemRecord must have `base_price` property');
        $this->assertObjectHasAttribute('tax', $saleitem, 'saleitemRecord must have `tax` property');
        $this->assertObjectHasAttribute('tax_percentage', $saleitem, 'saleitemRecord must have `tax_percentage` property');
        $this->assertObjectHasAttribute('taxed_price', $saleitem, 'saleitemRecord must have `taxed_price` property');
    }
}
