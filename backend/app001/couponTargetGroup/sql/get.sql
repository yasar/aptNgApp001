SELECT
  ctg.*,
  lcg.`name` AS clientgroup,
  lsg.`name` AS staffgroup,
  t.`name`   AS card_type
FROM
  `app001.coupon_target_group` AS ctg
  LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = ctg.client_group_id
  LEFT JOIN lup_staff_group AS lsg ON lsg.staff_group_id = ctg.staff_group_id
  LEFT JOIN `app001.card` AS c ON c.type_id = ctg.card_type_id
  LEFT JOIN `app999.type` AS t ON c.type_id = t.type_id
GROUP BY
  ctg.coupon_target_group_id