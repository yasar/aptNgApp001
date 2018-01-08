SELECT
  cf.card_fund_id,
  cf.enterprise_id,
  cf.transaction_id,
  cf.card_id,
  cf.client_id,
  cf.date,
  cf.deposit,
  cf.withdraw,
  cf.balance,
  cf.`timestamp`,
  cf.description,
  cl.`name` AS client,
  c.card_no
FROM
  `app001.card_fund` AS cf
  INNER JOIN vw_client_get AS cl ON cl.client_id = cf.client_id
  INNER JOIN `app001.card` AS c ON c.card_id = cf.card_id
