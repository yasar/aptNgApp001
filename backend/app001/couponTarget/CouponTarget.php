<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\couponTarget;


use BYRWEB\app001\couponTargetGroup\CouponTargetGroup;
use BYRWEB\app001\couponTargetGroup\CouponTargetGroupRecord;
use BYRWEB\base\ADbObject;
use BYRWEB\lup\type\Type;

class CouponTarget extends ADbObject
{
    /**
     *
     */
    public function __construct()
    {
        parent::__construct();
        $this->setRecordObject(new CouponTargetRecord());
    }
    
    /**
     * @param $id
     *
     * @return CouponTargetRecord
     */
    public function get($id)
    {
        return parent::get($id);
    }
    
    /**
     * @param      $data
     *
     * @param bool $updateOnDuplicate
     *
     * @return bool|\BYRWEB\app001\couponTarget\CouponTargetRecord
     * @throws \Exception
     */
    public function add($data, $updateOnDuplicate = false)
    {
        
        $couponTarget = parent::add($data, $updateOnDuplicate);
        
        
        $couponTargetGroup = new CouponTargetGroup();
        $couponTargetGroup->setDb($this->db);
        $couponTargetGroup->getRecordObject()->uses_enterprise_id = false;
        $couponTargetGroupPost                                    = [
            'coupon_target_id' => $couponTarget->coupon_target_id,
        ];
        $couponTargetGroup->getRecordObject()->loadFromArray($couponTargetGroupPost);
        $couponTargetGroup->getRecordObject()->add();
        
        return $couponTarget;
    }
    
    /**
     * @param $data
     *
     * @return bool|CouponTargetRecord
     * @throws \BYRWEB\base\Exception
     */
    public function update($data)
    {
        
        $couponTarget = parent::update($data);
        
        
        $couponTargetGroup = new CouponTargetGroup();
        $couponTargetGroup->setDb($this->db);
        
        // todo: make sure that uses_enterprise_id=false is here for a good reason.
        $couponTargetGroup->getRecordObject()->uses_enterprise_id = false;
        
        $rows = $couponTargetGroup->find(['coupon_target_id' => $data['coupon_target_id']]);
        
        if (count($rows) < 1) {
            return false;
        };
        
        /**
         * @var $row CouponTargetGroupRecord
         */
        $row                  = $rows[0];
        $row->client_group_id = $data['client_group_id'];
        $row->staff_group_id  = $data['staff_group_id'];
        $row->card_type_id    = $data['card_type_id'];
        $row->setDb($this->db);
        $row->uses_enterprise_id = false;
        $row->update();
        
        
        return $couponTarget;
        
    }
    
    /**
     * @param null  $filter
     * @param null  $keyword
     * @param null  $limit
     * @param array $order
     * @param null  $selectOnly
     *
     * @return CouponTargetRecord|CouponTargetRecord[]
     * @throws \BYRWEB\base\Exception
     */
    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
    {
        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn); // TODO: Change the autogenerated stub
    }
    
    
}