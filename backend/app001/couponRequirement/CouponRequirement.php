<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\couponRequirement;


use BYRWEB\base\ADbObject;

class CouponRequirement extends ADbObject
{
    /**
     *
     */
    public function __construct()
    {
        parent::__construct();
        $this->setRecordObject(new CouponRequirementRecord());
    }
    
//    /**
//     * @param $id
//     *
//     * @return CouponRequirementRecord
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
//     * @return bool|\BYRWEB\app001\couponRequirement\CouponRequirementRecord
//     */
//    public function add($data, $updateOnDuplicate = false)
//    {
//        /*
//        // migrated from old code, should be examined if need it.
//        if(!array_key_exists('coupon_subject_id', $data)){
//            $subjects=CouponSubject::filter(array('coupon_id'=>$data['coupon_id']));
//            $data['coupon_subject_id'] = $subjects[0]['coupon_subject_id'];
//        }
//        */
//
//        return parent::add($data, $updateOnDuplicate);
//    }
//
//    /**
//     * @param $data
//     *
//     * @return bool|CouponRequirementRecord
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
//     * @return CouponRequirementRecord[]
//     * @throws \BYRWEB\base\Exception
//     */
//    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
//    {
//        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn); // TODO: Change the autogenerated stub
//    }
    
    
}