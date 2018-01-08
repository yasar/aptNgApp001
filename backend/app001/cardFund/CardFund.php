<?php


namespace BYRWEB\app001\cardFund;


use BYRWEB\base\ADbObject;


class CardFund extends ADbObject
{


    public function __construct()
    {
    	parent::__construct();
        $this->setRecordObject(new CardFundRecord());
    }

}