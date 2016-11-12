SELECT
  sum(grand)      AS overall,
  sum(CASE WHEN YEAR(`timestamp`) = YEAR(CURDATE())
    THEN grand
      ELSE 0 END) AS `year`,
  sum(CASE WHEN YEAR(`timestamp`) = YEAR(CURDATE()) AND MONTH(`timestamp`) = MONTH(CURDATE())
    THEN grand
      ELSE 0 END) AS `month`,
  sum(CASE WHEN YEARWEEK(`timestamp`) = YEARWEEK(CURDATE())
    THEN grand
      ELSE 0 END) AS `week`,
  sum(CASE WHEN DATE(`timestamp`) = CURDATE()
    THEN grand
      ELSE 0 END) AS `day`
FROM sale AS s
WHERE s.enterprise_id = :enterprise_id
GROUP BY s.enterprise_id