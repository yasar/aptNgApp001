SELECT *
FROM (
       SELECT
         sip.saleitem_price_id,
         sip.saleitem_id,
         sip.price_type_id,
         sip.is_active,
         sip.is_primary,
         sip.price_id,
         sip.is_deleted,
         sip.enterprise_id,
         sip.__is_incomplete,
         sip.`timestamp`,
         t.`name` AS price_type,
         IF(
             sale_item_id IS NULL
             AND purchase_item_id IS NULL,
             NULL,
             1
         )        AS is_price_inuse
       FROM
         saleitem_price AS sip
         LEFT JOIN type AS t ON t.type_id = sip.price_type_id
         LEFT JOIN sale_item AS si ON si.price_id = sip.price_id
         LEFT JOIN purchase_item AS pi ON pi.price_id = sip.price_id
     ) AS _