<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\clientCard;


use BYRWEB\app999\entity\EntityRecord;
use BYRWEB\app999\person\PersonRecord;
use BYRWEB\base\ADbRecord;


class ClientCardRecord extends ADbRecord
{
    public $client_card_id, $enterprise_id, $client_id, $card_id, $is_primary, $password;
    public $card_no;

    public function __construct()
    {
        $this->setTableName('client_card');
        $this->setPrimaryKey('client_card_id');
        $this->setSqlQueryFind("select * from (
        SELECT
        cc.client_card_id,
        cc.client_id,
        cc.card_id,
        cc.is_primary,
        cc.enterprise_id,
        c.card_no
        FROM
        client_card AS cc
        INNER JOIN card AS c ON c.card_id = cc.card_id
        ) _");
    }

}

