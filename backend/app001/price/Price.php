<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\price;


use BYRWEB\base\ADbObject;
use BYRWEB\base\IDbObject;

class Price extends ADbObject implements IDbObject
{
    /**
     *
     */
    public function __construct()
    {
        $this->setRecordObject(new PriceRecord());
    }

    /**
     * @param $id
     * @return PriceRecord
     */
    public function get($id)
    {
        /**
         * @var PriceRecord
         */
        return parent::get($id);
//
    }

    /**
     * @param $data
     * @return bool|PriceRecord
     */
    public function add($data, $updateOnDuplicate = false)
    {

        return parent::add($data, $updateOnDuplicate);
    }

    /**
     * @param $data
     * @return bool|PriceRecord
     */
    public function update($data)
    {

        return parent::update($data);
    }

    /**
     * @param null $filter
     * @param null $keyword
     * @param null $limit
     * @param array $order
     * @return array
     */
    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
    {
        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn); // TODO: Change the autogenerated stub
    }


    /**
     * @return PriceRecord
     */
    public function getRecordObject()
    {
        return parent::getRecordObject(); // TODO: Change the autogenerated stub
    }

    /**
     * @param $filter
     * @param bool $singleRow
     * @param null $instance
     * @return PriceRecord|PriceRecord[]
     */
    public static function getBy2($filter, $singleRow = true, $instance = null)
    {
        return parent::getBy($filter, $singleRow, $instance); // TODO: Change the autogenerated stub
    }

    /**
     * @param        $filter
     * @param bool   $singleRow
     * @param null   $instance
     * @param string $mode
     *
     * @return PriceRecord|PriceRecord[]
     */
    public static function getBy($filter, $singleRow = true, $instance = null, $mode = 'find', array $order = [])
    {
        return parent::getBy($filter, $singleRow, $instance, $mode, $order);
    }


}