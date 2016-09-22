<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */

namespace BYRWEB\app001\client;

use BYRWEB\app001\cashSale\CashSale;
use BYRWEB\app001\clientCard\ClientCard;
use BYRWEB\app001\clientGroup\ClientGroup;
use BYRWEB\app001\clientGroup\ClientGroupRecord;
use BYRWEB\app001\point\Point;
use BYRWEB\app900\sale\Sale;
use BYRWEB\app999\address\Address;
use BYRWEB\app999\entity\Entity;
use BYRWEB\app999\entity\EntityAddressRecord;
use BYRWEB\app999\entity\EntityRecord;
use BYRWEB\app999\person\Person;
use BYRWEB\app999\person\PersonAddressRecord;
use BYRWEB\app999\person\PersonRecord;
use BYRWEB\base\ADbObject;
use BYRWEB\base\CardSecurity;
use BYRWEB\base\Exception;
use BYRWEB\base\IDbObject;
use BYRWEB\base\IWidget;
use BYRWEB\base\SecurityUtils;
use BYRWEB\base\WTDbUtils;
use BYRWEB\common\Session;
use BYRWEB\contact\Contact;
use BYRWEB\lup\type\Type;

class Client extends ADbObject implements IDbObject, IWidget
{
    public function __construct()
    {
        $this->setRecordObject(new ClientRecord());
    }

    public static function widgetForDashboard()
    {
        $db = WTDbUtils::$db;

        ///

        $sql = file_get_contents(__DIR__ . '/sql/widget/weekly_totals.sql');
        $sth = $db->prepare($sql);
        $sth->execute(['enterprise_id' => Session::user()->enterprise_id]);
        $rows = $sth->fetchAll(\PDO::FETCH_ASSOC);
        $stats['weekly_totals'] = $rows;

        ///

        $sql = file_get_contents(__DIR__ . '/sql/widget/stats_totals.sql');
        $sth = $db->prepare($sql);
        $sth->execute(['enterprise_id' => Session::user()->enterprise_id]);
        $rows = $sth->fetch(\PDO::FETCH_ASSOC);
        $stats['stats_totals'] = $rows;

        return $stats;
    }

    public static function updateStats($client_id)
    {
        Point::updateStats($client_id);
        CashSale::updateStats($client_id);
    }

    /**
     * @param      $data
     * @param bool $updateOnDuplicate
     *
     * @return bool|ClientRecord
     */
    public function add($data, $updateOnDuplicate = false)
    {
        if (!is_object($data)) {
            $data = (object)$data;
        }

        $this->db->beginTransaction();

        /**
         * quick client ekleme isleminde client group id set edildiginden dolayı client eklendikten sonra
         * client gruop eklenirken client_group_id set etmek zorundayız.
         * ama normal sekilde client eklemede add before mantıgıyla calıstıgı için client_group_id
         * set edilmediginden dolayı sadece add before ile eklenen clienta bir tane client group kaydı olusturuluyor
         * ve o client kaydı add before isleminden sonra acılan client formda o musteriye ait clint_group_id secildikten sonra
         * update islemi ile add before ile eklenen clienta ait client group tablosundaki clien_group_id set ediliyor.
         *
         *
         * suanki durumda client_group_id baslangıc default degeri olarak '0' set edilecek.
         * Bu durumda iki senaryo ortaya cıkacak.
         *
         * 1.senarya add before ile client eklendiginde client group tablasuna client_group_id '0' set edilecek.
         *
         * 2.senaryoda quick client ile client_group_id bilgisi geliyorsa o eklenen clientın
         * clint grubu o olacak.
         */
        $clientGroupId = 0;

        if (array_key_exists('quickEntityData', $data)) {
            $entityRecord = $this->addQuickEntityBeforeClient((object)$data);
            $data->entity_id = $entityRecord->entity_id;
            $clientGroupId = array_key_exists('client_group_id', $data) ? $data->client_group_id : $clientGroupId;
        }

        if (array_key_exists('quickPersonData', $data)) {
            $personRecord = $this->addQuickPersonBeforeClient((object)$data);
            $data->person_id = $personRecord->person_id;
            $clientGroupId = array_key_exists('client_group_id', $data) ? $data->client_group_id : $clientGroupId;

        }

        /**
         * @var $client ClientRecord
         */
        $client = parent::add($data, $updateOnDuplicate);

        if (!$client) {
            return false;
        }


        $clientGroup = new ClientGroup();
        $clientGroup->setDb($this->db);
        $data->client_id = $client->client_id;
        $clientGroup->add(['client_id' => $client->client_id,
                           'client_group_id' => $clientGroupId]);

        $this->db->commit();

        return parent::get($client->client_id);
    }

    public function addQuickEntityBeforeClient($data)
    {
        $entity = new Entity();
        $entity->setDb($this->db);
        $entity->getRecordObject()->loadFrom($data->quickEntityData);
        $entity->getRecordObject()->add();
        $entityRecord = $entity->get($this->db->lastInsertId());


        if (array_key_exists('quickAddressData', $data)) {


            $addressRecord = self::addQuickAddress($data->quickAddressData);

            $entityAddress = new EntityAddressRecord();
            $entityAddress->setDb($this->db);
            $entityAddress->entity_id = $entityRecord->entity_id;
            $entityAddress->address_id = $addressRecord->address_id;
            $entityAddress->title = 'Hızlı Musteri Kaydı';
            $entityAddress->add();
        }

        if (array_key_exists('quickContactData', $data)) {

            $data->quickContactData->entity_id = $entityRecord->entity_id;
            self::addQuickContact($data->quickContactData);
        }

        return $entityRecord;

    }

    private function addQuickAddress($data)
    {
        $address = new Address();
        $address->setDb($this->db);
        $address->getRecordObject()->loadFrom($data);
        $address->getRecordObject()->add();
        $addressRecord = $address->get($this->db->lastInsertId());

        return $addressRecord;
    }

    private function addQuickContact($data)
    {

        $data = (array)$data;

        foreach ($data as $key => $value) {
            if ($key !== 'phone' && $key !== 'email') {
                continue;
            }

            if ($key == 'phone') {
                $type = Type::getBy(['class' => 'Phone', 'name' => 'Mobile']);
                $data['value'] = $value;
            }
            if ($key == 'email') {
                $type = Type::getBy(['class' => 'Email']);
                $data['value'] = $value;
            }

            $data['type_id'] = $type->type_id;

            $contact = new Contact();
            $contact->setDb($this->db);
            $contact->getRecordObject()->loadFrom($data);
            $contact->getRecordObject()->add();
        }


    }

    public function addQuickPersonBeforeClient($data)
    {
        $person = new Person();
        $person->setDb($this->db);
        $person->getRecordObject()->loadFrom($data->quickPersonData);
        $person->getRecordObject()->add();
        $personRecord = $person->get($this->db->lastInsertId());


        if (array_key_exists('quickAddressData', $data)) {

            $addressRecord = self::addQuickAddress($data->quickAddressData);

            $personAddress = new PersonAddressRecord();
            $personAddress->setDb($this->db);
            $personAddress->person_id = $personRecord->person_id;
            $personAddress->address_id = $addressRecord->address_id;
            $personAddress->title = 'Hızlı Musteri Kaydı';
            $personAddress->add();
        }

        if (array_key_exists('quickContactData', $data)) {
            $data->quickContactData->person_id = $personRecord->person_id;
            self::addQuickContact($data->quickContactData);
        }

        return $personRecord;
    }

    /**
     * @param $data
     *
     * @return bool|ClientRecord
     */
    public function update($data)
    {
//        return;
        $client = parent::update($data);

        if (!$client) {
            return false;
        }

        $clientGroup = new ClientGroup();
        $clientGroup->setDb($this->db);
        $clientGroup->update($data);

        return parent::get($client->client_id);

    }

    /**
     * @param null $filter
     * @param null $keyword
     * @param null $limit
     * @param array $order
     * @param null $selectOnly
     *
     * @return $row ClientRecord[]
     * @throws Exception
     */
    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
    {

        if (array_key_exists('client_type', $filter) && $filter['client_type'] == 'person') {
            $this->getRecordObject()->setSqlQueryStaticFilter('_.person_id is not null and _.entity_id is null and __is_incomplete is null');
            unset($filter['client_type']);
        } elseif (array_key_exists('client_type', $filter) && $filter['client_type'] == 'entity') {
            $this->getRecordObject()->setSqlQueryStaticFilter('_.person_id is null and _.entity_id is not null and __is_incomplete is null');
            unset($filter['client_type']);
        } else {
            $this->getRecordObject()->setSqlQueryStaticFilter('(_.person_id is not null or _.entity_id is not null) and __is_incomplete is null');
        }


        if (array_key_exists('card_nr', $filter)) {
            $clientId = $this->getClientIdByCardNr($filter['card_nr']);
            unset($filter['card_nr']);
            $filter['client_id'] = $clientId;
        }


        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn);
    }

    /**
     * @return ClientRecord
     */
    public function getRecordObject()
    {
        return parent::getRecordObject(); // TODO: Change the autogenerated stub
    }

    public function getClientIdByCardNr($card_nr)
    {
        $security_code = CardSecurity::getHash($card_nr);
        $sql = "SELECT
                                client_card.client_id
                            FROM
                                card
                            INNER JOIN client_card ON client_card.card_id = card.card_id
                            WHERE
                                card.enterprise_id = " . SecurityUtils::getEnterpriseId() . "
                                and card.security_code = '$security_code'";
        $sth = $this->db->query($sql);
        $row = $sth->fetch(\PDO::FETCH_ASSOC);

        return $row['client_id'];
    }

    public function getByCardNr($card_nr)
    {
        $client_id = $this->getClientIdByCardNr($card_nr);

        return parent::get($client_id);
    }

    public function getCardList($client_id)
    {
        $cc = new ClientCard();
        $cc->setDb($this->db);

        return $cc->find(['client_id' => $client_id]);
    }

    public function getProfile($client_id, $profile_type)
    {
        $getStats = function ($client_id) {

            $sql = "SELECT
                        c.client_id,
                        (
                            CASE
                            WHEN c.person_id IS NOT NULL THEN
                                concat(
                                    p.first_name,
                                    ' ',
                                    p.last_name
                                )
                            WHEN c.entity_id IS NOT NULL THEN
                                e.title
                            END
                        ) AS `name` ,
                        lcg.name as clientgroup,
                        lcg.color,
                        p.tckn AS tck_no,
                        con_phone.`value` AS phone,
                        cs.total_points,
                        cs.total_sales,
                        cs.total_card_debt,
                        cs.total_fund,
                        con_email.`value` AS email
                    FROM
                        client AS c
                    LEFT JOIN entity as e ON e.entity_id = c.entity_id
                    LEFT JOIN person AS p ON p.person_id = c.person_id
                    LEFT JOIN client_group AS cg ON cg.client_id = c.client_id
                    LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = cg.client_group_id
                    LEFT JOIN client_stats AS cs ON cs.client_id = c.client_id
                    LEFT JOIN (select * from contact where type_id in (select type_id from `type` where `name`='mobile')) as con_phone ON con_phone.person_id = p.person_id or con_phone.entity_id=e.entity_id
                    LEFT JOIN (select * from contact where type_id in (select type_id from `type` where `name`='email')) as con_email ON con_email.person_id = p.person_id or con_email.entity_id=e.entity_id
                    WHERE
                        c.client_id =  $client_id";

            $sth = $this->db->query($sql);
            $row = $sth->fetch(\PDO::FETCH_ASSOC);

            return $row;

        };

        $getOverviewProfile = function ($client_id) {

            $sql = "SELECT
	c.client_id,
	c.person_id,
	c.entity_id,
	(
		CASE
		WHEN c.person_id IS NOT NULL THEN
			concat(
				p.first_name,
				' ',
				p.last_name
			)
		WHEN c.entity_id IS NOT NULL THEN
			e.title
		END
	) AS `name`,
	lcg. NAME AS clientgroup,
	lcg.color,
	p.tckn AS tck_no,
	'05xx 303 xx xx' AS phone,
	cs.total_points,
	cs.total_sales,
	cs.total_card_debt,
	cs.total_fund
FROM
	client AS c
LEFT JOIN person AS p ON p.person_id = c.person_id
LEFT JOIN entity AS e ON e.entity_id = c.entity_id
LEFT JOIN client_group AS cg ON cg.client_id = c.client_id
LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = cg.client_group_id
LEFT JOIN client_stats AS cs ON cs.client_id = c.client_id
WHERE
                        c.client_id =$client_id";
            $sth = $this->db->query($sql);
            $row = $sth->fetch(\PDO::FETCH_ASSOC);

            return $row;

        };

        switch ($profile_type) {
            case 'sale':
                $data = [
                    'invoice' => $this->getInvoiceProfile($client_id),
                    'stats' => $getStats($client_id),
                ];

                return $data;
                break;

            case 'overview':
                return $getStats($client_id);

                return $getOverviewProfile($client_id);
                break;
        }
    }

    public function getInvoiceProfile($clientId)
    {
        $clientRecord = $this->get($clientId);
        $clientRecord->setDb($this->getDb());

        if ($clientRecord->person_id !== null) {
            $clientRecord->loadPerson();
            $clientRecord->person->setDb($this->getDb());
            $clientRecord->person->loadAddresses();
        }

        if ($clientRecord->entity_id !== null) {
            $clientRecord->loadEntity();
            $clientRecord->entity->setDb($this->getDb());
            $clientRecord->entity->loadAddresses();
        }

        return $clientRecord;

    }

    /**
     * @param $id
     *
     * @return ClientRecord
     */
    public function get($id)
    {
        return parent::get($id);
    }

    public function getSaleHistory($clientId)
    {
        $sale = new Sale();
        $sale->setDb($this->db);
        $sales = $sale->find(['client_id' => $clientId]);

        return $sales;
    }
}