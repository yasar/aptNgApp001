SELECT _.*
FROM
  (SELECT
     sp.*,
     t.`name` AS price_type
   FROM
     `app001.saleitem_price` AS sp
     LEFT JOIN `app999.type` AS t ON t.type_id = sp.price_type_id
  ) AS _