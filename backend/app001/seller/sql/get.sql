SELECT
	_.*
FROM
	(
		SELECT
			s.*, (
				CASE
				WHEN s.person_id IS NOT NULL THEN
					concat(
						p.first_name,
						" ",
						p.last_name
					)
				WHEN s.entity_id IS NOT NULL THEN
					e.title
				END
			) AS `name`,
			cnp_email.
		VALUE
			AS email,
			cnp_phone.
		VALUE
			AS phone
		FROM
			seller AS s
		LEFT JOIN person AS p ON s.person_id = p.person_id
		LEFT JOIN entity AS e ON s.entity_id = e.entity_id
		LEFT JOIN contact AS cnp_email ON (
			cnp_email.entity_id = e.entity_id
		)
		AND cnp_email.type_id IN (
			SELECT
				type_id
			FROM
				type
			WHERE
				class = 'Email'
		)
		LEFT JOIN contact cnp_phone ON (
			cnp_phone.person_id = p.person_id
			OR cnp_phone.entity_id = e.entity_id
		)
		AND cnp_phone.type_id IN (
			SELECT
				type_id
			FROM
				type
			WHERE
				class = 'Phone'
		)
		WHERE
			s.is_deleted IS NULL
			GROUP BY
			s.seller_id
		ORDER BY
			s.seller_id DESC
	) AS _