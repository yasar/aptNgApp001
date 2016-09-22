<?php

namespace BYRWEB\app001\application;


use BYRWEB\base\ADbRecord;

class ApplicationRecord extends ADbRecord
{

    public $app_id, $name, $title, $description, $setup, $group_name, $Row_ctr;

    public function __construct()
    {
        $this->setTableName('apps');
        $this->setPrimaryKey('app_id');
    }

}

