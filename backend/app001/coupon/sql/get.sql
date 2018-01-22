SELECT
  c.*,
  t.name AS coupon_status
FROM `app001.coupon` AS c
  INNER JOIN `app999.type` t ON t.type_id = c.status_id