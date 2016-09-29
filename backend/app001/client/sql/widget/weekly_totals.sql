SELECT
  COUNT(client_id)  AS value,
  WEEK(`timestamp`) AS title
FROM
  client
WHERE
  __is_incomplete IS NULL
  AND enterprise_id = :enterprise_id
  AND YEAR(`timestamp`) = YEAR(CURDATE())
GROUP BY
  `title`
