<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:20
 */

namespace BYRWEB\app001\client;


use BYRWEB\app999\entity\EntityRecord;
use BYRWEB\app999\person\PersonRecord;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\NestedPDO;
use BYRWEB\contact\Contact;
use BYRWEB\contact\ContactRecord;


class ClientRecord extends ADbRecord
{
    public $client_id, $enterprise_id, $timestamp, $person_id,
        $entity_id, $registration_date, $notes, $is_deleted, $staff_id, $__is_incomplete;

    /**
     * @var PersonRecord
     */
    public $person;


    /**
     * @var EntityRecord
     */
    public $entity;

    /**
     * @var ContactRecord
     */
    public $contact;

    /**
     * @var setSearchableFields için tanımlandı
     * selectorde name gore arama yapabilmek için
     */
    public $name;

    public function __construct()
    {
        $this->setTableName('client');
        $this->setPrimaryKey('client_id');
        $this->setSqlQueryStaticFilter('__is_incomplete is null');
        $this->setSearchableFields(['name']);
        $this->setSqlQuery(file_get_contents(__DIR__ . '/sql/get.sql'));

    }

    public function loadPerson()
    {
        $this->person = new PersonRecord();
        $this->person->setDb($this->getDb());
        $this->person->setPrimaryValue($this->person_id);
        $this->person->load();
    }

    public function loadEntity()
    {
        $this->entity = new EntityRecord();
        $this->entity->setDb($this->getDb());
        $this->entity->setPrimaryValue($this->entity_id);
        $this->entity->load();
    }

    public function loadContact()
    {
        $targetType    = 'person_id';
        $targetId      = 712;
        $this->contact = new Contact();
        $this->contact->setDb($this->getDb());
        $this->contact->loadContacts($targetType, $targetId);

    }

}

