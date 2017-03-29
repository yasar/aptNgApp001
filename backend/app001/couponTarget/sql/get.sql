SELECT _.*
FROM
  (
    SELECT
      ct.*,
      `t`.`name` AS target,
      ctg.client_group_id,
      lcg.NAME   AS clientgroup,
      ctg.staff_group_id,
      lsg.`name` AS staffgroup,
      (
        CASE
        WHEN ctg.staff_group_id IS NOT NULL
          THEN
            lsg.`name`
        WHEN ctg.client_group_id IS NOT NULL
          THEN
            lcg.NAME
        WHEN ctg.card_type_id IS NOT NULL
          THEN
            cardt.`name`
        END
      )          AS `group`
    FROM
      `app001.coupon_target` ct
      LEFT JOIN `app001.coupon_target_group` ctg
        ON ctg.coupon_target_id = ct.coupon_target_id
      LEFT JOIN `app999.type` `t`
        ON `t`.type_id = ct.type_id
      LEFT JOIN lup_client_group lcg
        ON lcg.client_group_id = ctg.client_group_id
      LEFT JOIN lup_staff_group lsg
        ON lsg.staff_group_id = ctg.staff_group_id
      LEFT JOIN `app001.card` AS c
        ON c.type_id = ctg.card_type_id
      LEFT JOIN `app999.type` AS cardt
        ON cardt.type_id = c.type_id
    GROUP BY
      ct.coupon_id
  ) AS _