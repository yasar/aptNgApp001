<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\couponCondition;


use BYRWEB\base\ADbObject;

class CouponCondition extends ADbObject
{
    /**
     *
     */
    public function __construct()
    {
        parent::__construct();
        $this->setRecordObject(new CouponConditionRecord());
    }
    
//    /**
//     * @param $id
//     *
//     * @return CouponConditionRecord
//     */
//    public function get($id)
//    {
//        return parent::get($id);
////
//    }
//
//    /**
//     * @param      $data
//     *
//     * @param bool $updateOnDuplicate
//     *
//     * @return bool|\BYRWEB\app001\couponCondition\CouponConditionRecord
//     */
//    public function add($data, $updateOnDuplicate = false)
//    {
//        return parent::add($data, $updateOnDuplicate);
//    }
//
//    /**
//     * @param $data
//     *
//     * @return bool|CouponConditionRecord
//     */
//    public function update($data)
//    {
//        return parent::update($data);
//    }
//
//    /**
//     * @param null  $filter
//     * @param null  $keyword
//     * @param null  $limit
//     * @param array $order
//     * @param null  $selectOnly
//     *
//     * @return CouponConditionRecord[]
//     * @throws \BYRWEB\base\Exception
//     */
//    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
//    {
//        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn); // TODO: Change the autogenerated stub
//    }
    
    
}