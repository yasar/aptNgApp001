SELECT
	_.*
FROM
	(
		SELECT
			coupon_target.*, `type`.`name` AS target,
			coupon_target_group.client_group_id,
			lup_client_group. NAME AS clientgroup,
			coupon_target_group.staff_group_id,
			lup_staff_group.`name` AS staffgroup,
			(
				CASE
				WHEN coupon_target_group.staff_group_id IS NOT NULL THEN
					lup_staff_group.`name`
				WHEN coupon_target_group.client_group_id IS NOT NULL THEN
					lup_client_group. NAME
				WHEN coupon_target_group.card_type_id IS NOT NULL THEN
					cardt.`name`
				END
			) AS `group`
		FROM
			coupon_target
		LEFT JOIN coupon_target_group ON coupon_target_group.coupon_target_id = coupon_target.coupon_target_id
		LEFT JOIN `type` ON `type`.type_id = coupon_target.type_id
		LEFT JOIN lup_client_group ON lup_client_group.client_group_id = coupon_target_group.client_group_id
		LEFT JOIN lup_staff_group ON lup_staff_group.staff_group_id = coupon_target_group.staff_group_id
		LEFT JOIN card AS c ON c.type_id = coupon_target_group.card_type_id
		LEFT JOIN type AS cardt ON cardt.type_id = c.type_id
		GROUP BY
			coupon_target.coupon_id
	) AS _