SELECT *
FROM (
       SELECT
         si.saleitem_id,
         si.`name`,
         si.barcode,
         si.enterprise_id,
         lupb.`name`              AS brand_name,
         lupb.brand_id,
         lupm.`name`              AS model_name,
         t.`name`                 AS type_name,
         t.`conf`                 AS type_conf,
         lupsig.name              AS group_name,
         lupsig.saleitem_group_id,
         lup_saleitem_unit.`name` AS saleitem_unit_name
       FROM
         `app001.saleitem` AS si
         LEFT JOIN lup_brand AS lupb
           ON lupb.brand_id = si.brand_id
         LEFT JOIN lup_model AS lupm
           ON lupm.model_id = si.model_id
         LEFT JOIN `app999.type` AS t
           ON t.type_id = si.type_id
         LEFT JOIN lup_saleitem_group AS lupsig
           ON lupsig.saleitem_group_id = si.group_id
         LEFT JOIN lup_saleitem_unit
           ON lup_saleitem_unit.saleitem_unit_id = si.unit_id
       WHERE si.__is_incomplete IS NULL
     ) _