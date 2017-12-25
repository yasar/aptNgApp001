<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 21.01.2016
 * Time: 11:28
 */


namespace BYRWEB\app001\coupon;


use BYRWEB\app999\type\Type;
use BYRWEB\base\ADbObject;
use BYRWEB\base\IDbObject;

class Coupon extends ADbObject implements IDbObject
{
    /**
     *
     */
    public function __construct()
    {
    	parent::__construct();
        $this->setRecordObject(new CouponRecord());
    }
    
    /**
     * @param $id
     *
     * @return CouponRecord
     */
    public function get($id)
    {
        /**
         * @var CouponRecord $foundationRecord
         */
        return parent::get($id);
//
    }
    
    /**
     * @param $data
     *
     * @return bool|CouponRecord
     */
    public function add($data, $updateOnDuplicate = false)
    {
        $type            = Type::getBy(['groupname' => 'coupon_status', 'name' => 'draft']);
        $data->status_id = $type->type_id;
        
        return parent::add($data, $updateOnDuplicate);
    }
    
    /**
     * @param $data
     *
     * @return bool|CouponRecord
     */
    public function update($data)
    {
        
        return parent::update($data);
    }
    
    /**
     * @param null  $filter
     * @param null  $keyword
     * @param null  $limit
     * @param array $order
     * @param null  $selectOnly
     *
     * @return CouponRecord[]
     * @throws \BYRWEB\base\Exception
     */
    public function find($filter = null, $keyword = null, $limit = null, array $order = [], $selectOnly = null, $lookIn = null)
    {
        return parent::find($filter, $keyword, $limit, $order, $selectOnly, $lookIn); // TODO: Change the autogenerated stub
    }
    
    public function getOverview($couponId)
    {
        $sql = "SELECT
c.coupon_id,
c.title,
c.`code`,
c.description,
c.is_published,
c.`timestamp`,
cc.total_condition,
ct.total_target,
cr.total_requirement,
crw.total_reward,
cs.total_subject,
t.name as coupon_status
FROM
`app001.coupon` AS c
left join (select coupon_id, count(coupon_condition_id) as total_condition from `app001.coupon_condition` where coupon_id=$couponId) as cc on cc.coupon_id=c.coupon_id
left join (select coupon_id, count(coupon_target_id) as total_target from `app001.coupon_target` where coupon_id=$couponId) as ct on ct.coupon_id=c.coupon_id
left join (select coupon_id, count(coupon_requirement_id) as total_requirement from `app001.coupon_requirement` where coupon_id=$couponId) as cr on cr.coupon_id=c.coupon_id
left join (select coupon_id, count(coupon_reward_id) as total_reward from `app001.coupon_reward` where coupon_id=$couponId) as crw on crw.coupon_id=c.coupon_id
left join (select coupon_id, count(coupon_subject_id) as total_subject from `app001.coupon_subject` where coupon_id=$couponId) as cs on cs.coupon_id=c.coupon_id
LEFT JOIN `app999.type` as st on st.type_id = c.status_id
where c.coupon_id=$couponId
group by c.coupon_id
";
        $sth = $this->db->query($sql);
        $row = $sth->fetch(\PDO::FETCH_ASSOC);
        
        return $row;
    }
    
    public function getApplicableStatuses()
    {
        return Type::getBy(['groupname' => 'coupon_status', 'class' => 'applicable'], false);
    }
    
    
    /*  public function checkValidityCoupon($couponId)
      {
          $couponCondition=new
      }*/
}