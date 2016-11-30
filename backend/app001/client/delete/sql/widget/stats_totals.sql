SELECT
  count(c.client_id) AS client_count,
  sum(CASE WHEN s.sale_id IS NOT NULL
    THEN 1
      ELSE 0 END)    AS sale_count,
  sum(CASE WHEN s.sale_id IS NULL
    THEN 1
      ELSE 0 END)    AS no_sale_count
FROM client AS c
  LEFT JOIN sale AS s ON s.client_id = c.client_id
WHERE c.enterprise_id = :enterprise_id
GROUP BY c.enterprise_id