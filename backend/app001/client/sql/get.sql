SELECT _.*
FROM
  (
    SELECT
      c.*,
      lcg.`name` AS clientgroup,
      lcg.color,
      lcg.client_group_id,
      (
        CASE
        WHEN c.person_id IS NOT NULL
          THEN
            concat(
                p.first_name,
                ' ',
                p.last_name
            )
        WHEN c.entity_id IS NOT NULL
          THEN
            e.title
        END
      )          AS `name`,
      (
        CASE
        WHEN c.person_id IS NOT NULL
          THEN
            p.contact_json
        WHEN c.entity_id IS NOT NULL
          THEN
            e.contact_json
        END
      )          AS `contact_json`
    FROM
      client AS c
      LEFT JOIN client_group AS cg ON cg.client_id = c.client_id
      LEFT JOIN lup_client_group AS lcg ON lcg.client_group_id = cg.client_group_id
      LEFT JOIN vw_entity_get AS e ON e.entity_id = c.entity_id
      LEFT JOIN vw_person_get AS p ON p.person_id = c.person_id
    WHERE
      c.is_deleted IS NULL
  ) AS _