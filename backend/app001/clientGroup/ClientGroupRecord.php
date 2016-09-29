<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\clientGroup;


use BYRWEB\base\ADbRecord;


class ClientGroupRecord extends ADbRecord
{
    public $id,$client_id, $client_group_id, $is_primary;

    public function __construct()
    {
        $this->setTableName('client_group');
        $this->setPrimaryKey('id');
        $this->setSqlQueryFind("select * from ( SELECT cg.* FROM client_group as cg ) _");
        $this->uses_enterprise_id           = false;
    }

}

