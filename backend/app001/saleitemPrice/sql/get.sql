SELECT _.*
FROM
  (SELECT
     sp.*,
     t.`name` AS price_type
   FROM
     `saleitem_price` AS sp
     LEFT JOIN type AS t ON t.type_id = sp.price_type_id
  ) AS _