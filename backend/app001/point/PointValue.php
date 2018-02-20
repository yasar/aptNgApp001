<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 05.11.2015
 * Time: 13:16
 */

namespace BYRWEB\app001\point;




use BYRWEB\base\ADbObject;
use BYRWEB\base\SecurityUtils;
use BYRWEB\base\WTDbUtils;
use BYRWEB\common\Session;


/**
 * Class PointValue
 *
 * @package BYRWEB\app001\point
 * @method PointValueRecord getRecordObject()
 */
class PointValue extends ADbObject
{
	
	public
	function __construct()
	{
		parent::__construct();
		$this->setRecordObject(new PointValueRecord());
	}
	
	
	
	/**
	 * @return PointValueRecord
	 */
	public static
	function getActivePointValue(): PointValueRecord
	{
		$db  = WTDbUtils::$db;
		$sql = 'SELECT * FROM `app001.point_value` WHERE is_active=1 AND end_date IS NULL AND '
		       . SecurityUtils::getEnterpriseSecurityForQuery(true, false, '');
		$sth = $db->query($sql);
		//        return $sth->fetchObject( __NAMESPACE__.'\PointValueRecord');
		
		$record = $sth->fetchObject(PointValueRecord::class);
		
		return $record;
	}
	
}

