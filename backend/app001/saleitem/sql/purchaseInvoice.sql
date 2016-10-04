SELECT
  _.*
FROM
  (
    SELECT
      si.saleitem_id,
      si.enterprise_id,
      si.type_id,
      si.group_id,
      si.brand_id,
      si.model_id,
      si.barcode,
      si.`code`,
      si.`name`,
      si.unit_id,
      si.stock,
      lup_saleitem_group.`name` AS saleitem_group_name,
      lup_saleitem_unit.`name` AS saleitem_unit_name,
      p.base_price,
      p.tax,
      p.taxed_price,
      p.price_id,
      p.currency_id,
      luptx.tax_percentage,
      t.`name` AS price_type_name,
      lupcur.currency AS currency_name,
      lupcur. CODE AS currency_code,
      si.__is_incomplete,
      si.is_partial,
      sip.is_active,
      sitype.`name` AS saleitem_type,
      pc.count
    FROM
      saleitem AS si
      LEFT JOIN lup_saleitem_group ON lup_saleitem_group.saleitem_group_id = si.group_id
      LEFT JOIN lup_saleitem_unit ON lup_saleitem_unit.saleitem_unit_id = si.unit_id
      LEFT JOIN saleitem_price AS sip ON sip.saleitem_id = si.saleitem_id
                                         AND sip.is_active = 1
      LEFT JOIN price AS p ON p.price_id = sip.price_id
      LEFT JOIN lup_currency AS lupcur ON lupcur.currency_id = p.currency_id
      LEFT JOIN type AS t ON t.type_id = sip.price_type_id
      LEFT JOIN type_group AS tg ON tg.type_group_id = t.type_group_id
                                    AND tg.`name` = 'saleitem_type'
      LEFT JOIN lup_tax AS luptx ON luptx.tax_id = p.tax_id
      LEFT JOIN type AS sitype ON si.type_id = sitype.type_id
      LEFT JOIN (
                  SELECT
                    saleitem_id,
                    count(*) AS count
                  FROM
                    saleitem_price
                    LEFT JOIN type AS saleitem_price_type ON saleitem_price_type.type_id = price_type_id
                  WHERE
                    is_active = 1
                    AND saleitem_price_type. NAME = 'purchase'
                  GROUP BY
                    saleitem_id
                ) AS pc ON pc.saleitem_id = si.saleitem_id
    WHERE
      si.__is_incomplete IS NULL

    GROUP BY
      si.saleitem_id
  ) AS _