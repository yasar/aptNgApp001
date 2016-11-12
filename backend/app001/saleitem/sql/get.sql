SELECT *
FROM (
       SELECT
         si.*,
         lupb.`name`   AS brand_name,
         lupm.`name`   AS model_name,
         t.`name`      AS type_name,
         lupsig.name   AS group_name,
         lupsiu.`name` AS saleitem_unit_name
       FROM
         saleitem AS si
         LEFT JOIN lup_brand AS lupb ON lupb.brand_id = si.brand_id
         LEFT JOIN lup_model AS lupm ON lupm.model_id = si.model_id
         LEFT JOIN type AS t ON t.type_id = si.type_id
         LEFT JOIN lup_saleitem_group AS lupsig ON lupsig.saleitem_group_id = si.group_id
         LEFT JOIN lup_saleitem_unit AS lupsiu ON lupsiu.saleitem_unit_id = si.unit_id
     ) _