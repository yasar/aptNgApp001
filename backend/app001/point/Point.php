<?php
/**
 * Created by IntelliJ IDEA.
 * User: unal
 * Date: 05.11.2015
 * Time: 13:02
 */

namespace BYRWEB\app001\point;




use BYRWEB\base\ADbObject;
use BYRWEB\base\ADbRecord;
use BYRWEB\base\WTDbUtils;


class Point extends ADbObject
{
	
	public
	function __construct()
	{
		parent::__construct();
		$this->setRecordObject(new PointRecord());
	}
	
	
	
	public static
	function getTotalPoints($client_id)
	{
		$sql = 'select points_total from ' . PointRecord::TABLE_NAME . "
              where client_id=$client_id ORDER BY `timestamp` DESC LIMIT 1";
		$sth = WTDbUtils::$db->query($sql);
		ADbRecord::evalError($sth);
		
		$row = $sth->fetch(\PDO::FETCH_ASSOC);
		if (!$row) {
			return 0;
		}
		
		return $row['points_total'] * 1.0;
	}
	
	
	
//	public static
//	function updateStats($client_id)
//	{
//		$db  = WTDbUtils::$db;
//		$sql = "select points_total from " . PointRecord::TABLE_NAME . "
//              where client_id=$client_id ORDER BY `timestamp` DESC LIMIT 1";
//		$sth = $db->query($sql);
//		ADbRecord::evalError($sth);
//
//		$row = $sth->fetch(\PDO::FETCH_ASSOC);
//		if (!$row) {
//			return;
//		}
//
//		$points_total = $row['points_total'];
//
//		$sql = "UPDATE `app999.client_stats`
//            SET total_points=$points_total
//            WHERE client_id=$client_id";
//		$db->execUpdate($sql);
//	}
	
	
	
	//	/**
	//	 * @param                $filter
	//	 * @param bool           $singleRow
	//	 * @param ADbObject|null $instance
	//	 *
	//	 * @param string|null    $mode
	//	 * @param array|null     $order
	//	 * @param int|null       $limit
	//	 *
	//	 * @return PointRecord|PointRecord[]
	//	 */
	//	public static //	function getBy($filter, $singleRow = true, $instance = null, $mode = 'find', array $order = [])
	//	function getBy($filter, $singleRow = true, ADbObject $instance = null, string $mode = null, array $order = null, int $limit = null)
	//	{
	//		return parent::getBy($filter, $singleRow, $instance, $mode, $order, $limit);
	//	}
	
	
}