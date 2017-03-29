SELECT _.*
FROM (
       SELECT
         sip.saleitem_package_id,
         sip.package_id,
         sip.saleitem_id,
         sip.qty,
         sip.is_partial,
         sip.enterprise_id,
         si.`name`     AS `name`,
         lupsig.`name` AS saleitem_group_name,
         t.`name`      AS type_name,
         t.`conf`      AS type_conf
       FROM
         `app001.saleitem_package` AS sip
         INNER JOIN `app001.saleitem` AS si
           ON si.saleitem_id = sip.saleitem_id
         LEFT JOIN `app999.type` AS t
           ON t.type_id = si.type_id
         INNER JOIN lup_saleitem_group AS lupsig
           ON lupsig.saleitem_group_id = si.group_id
     ) AS _