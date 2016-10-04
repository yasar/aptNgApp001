<?php
/**
 * Created by IntelliJ IDEA.
 * User: yasar
 * Date: 28.05.2016
 * Time: 14:51
 */

namespace BYRWEB\app001\payment;

use BYRWEB\app001\couponInspector\CouponInspector;
use BYRWEB\app001\couponInspector\CouponPaymentSplit;
use BYRWEB\app900\account\Account;

class Payment3
{
    public static function process($post)
    {

        CouponInspector::setPostData($post);

        $inspector = CouponInspector::getCoupons();

        /**
         * exempt olan sale itemlar totala dahil edilmedigi için split bos geliyor.
         * nedeni ise biz spliti gelen totale gore dolduruyoruz
         * şimdi eger post içinden payment split bos ise tek tip ödeme oldugundan splite eger varsa new totali atıyoruz
         *eger yok ise coupon inspectorden alıyoruz splitleri
         */
        if (count($post['payment_splits']) == 0) {
            $split = new CouponPaymentSplit();
            $split->amount = $inspector->new_total['grand'];
            $split->setTypeId($post['default_payment_type_id']);
            $splits[] = $split;

        } else {

            $splits =& CouponInspector::getPayment()->getSplits();
        }

        $transaction_id = null;

        /**
         * Check if GeneralLedger Module has been enabled
         */
        if (true) {
            $transaction_id = self::processTransaction($splits, $inspector);
        }

        self::processCurrent($post, $inspector, $transaction_id);

        self::processSale($post, $inspector, $transaction_id);

        /**
         * for invoice
         */
        self::processInvoice($post);

        self::processPoints($inspector, $splits);

        Client::updateStats(self::$sale->client_id);

        self::processStock($post['sale_items']);

        self::addClientPackageItem($post['sale_items']);

    }

    private static function processTransaction(&$splits, $inspector)
    {
        /**
         * @var $split CouponPaymentSplit
         */

        $tx_splits = array();

        foreach ($splits as &$split) {
            $arr = self::getAccountAndTxTypeByPaymentType($split->getTypeId());
            $tx_split['account_id'] = $arr['account_id'];
            $tx_split['tx_type'] = $arr['tx_type'];
            $tx_split['amount'] = $split->amount;
            $tx_split['payment_type_id'] = $split->getTypeId();
            $tx_splits[] = $tx_split;
        };

        $total = $inspector->total;
        $new_total = $inspector->new_total;

        $tx_splits[] = array(
            'account_id' => 'sales',
            'tx_type' => 'credit',
            'amount' => $total['price']
        );

        $tx_splits[] = array(
            'account_id' => 'tax',
            'tx_type' => 'credit',
            'amount' => $new_total['tax']
        );

        $tx_splits[] = array(
            'account_id' => 'discount',
            'tx_type' => 'debt',
            'amount' => $total['price'] - $new_total['price']
        );

//        $tx_splits[] = array(
//            'account_id' => 'future_debt',
//            'tx_type' => 'debt',
//            'amount' => '0.01'
//        );
//
//        $tx_splits[] = array(
//            'account_id' => 'points_cash',
//            'tx_type' => 'credit',
//            'amount' => '0.01'
//        );


        /**
         * sıralı voucher_num üretmek için mekanizma üretilecek
         */
        $transaction = array(
            'currency_id' => 1,
            'voucher_num' => rand(1000, 9999),
            'timestamp_created' => date('Y-m-d H:i:s'),
            'timestamp_post' => date('Y-m-d H:i:s'),
            'splits' => $tx_splits,
        );

        $transaction_id = Transaction::add($transaction);

        return $transaction_id;
    }

    public static function getAccountAndTxTypeByPaymentType($payment_type_id)
    {

        static $payment_types = null;
        if ($payment_types === null) {
            $filter = array(
                'name' => 'payment_type'
            );
            $payment_types = Type::all($filter);
        }


        foreach ($payment_types as $payment_type) {

            if ($payment_type['type_id'] !== $payment_type_id) {
                continue;
            }
            switch ($payment_type['name']) {
                case 'cash':
                    $special_account_code = 'cash';
                    $tx_type = 'debt';
                    break;
                case 'card_fund':
                    $special_account_code = 'card_fund';
                    $tx_type = 'debt';

                    break;
                case'points_cash':
                    $special_account_code = 'points_cash';
                    $tx_type = 'debt';

                    break;
                case'credit_card':
                    $special_account_code = 'credit_card';
                    $tx_type = 'debt';
                    break;

                case'instalment':
                    $special_account_code = 'instalment';
                    $tx_type = 'debt';
                    break;

                case'sales_credit':
                    $special_account_code = 'sales_credit';
                    $tx_type = 'debt';
                    break;
            }


        }


        $account_id = Account::getSpecialAccount($special_account_code);

        $account = array(
            'account_id' => $account_id['account_id'],
            'tx_type' => $tx_type,
        );


        return $account;

    }
}