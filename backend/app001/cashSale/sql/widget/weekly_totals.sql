SELECT
  SUM(grand)        AS value,
  WEEK(`timestamp`) AS title
FROM
  sale
WHERE
  enterprise_id = :enterprise_id
  AND YEAR(`timestamp`) = YEAR(CURDATE())
GROUP BY
  `title`
