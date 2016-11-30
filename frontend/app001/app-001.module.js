/**
 * Created by yasar on 20.12.2015.
 */

(function () {

    angular.module('apt.app001', [
        'apt.app001.route',
        'apt.app001.icons',
        'apt.app001.application', // disabled temporarily
        'apt.app001.card',
        // 'apt.app001.client',
        'apt.app001.clientCard',
        'apt.app001.coupon',
        'apt.app001.couponCondition',
        'apt.app001.couponSubject',
        'apt.app001.couponTarget',
        'apt.app001.couponRequirement',
        'apt.app001.couponReward',
        'apt.app001.dashboard',
        'apt.app001.price',
        'apt.app001.cashSale',
        'apt.app001.saleitem',
        'apt.app001.saleitemPrice',
        'apt.app001.saleitemPackage',
        'apt.app001.seller',
        'apt.app001.shoppingCart',
        'apt.app001.till',
        // 'apt.appointment',
        'apt.calendar',
        // 'apt.example',
        // 'apt.layout',
        //'apt.level',
        'apt.lup',
        'apt.lup.brand',
        'apt.lup.clientGroup',
        'apt.lup.currency',
        'apt.lup.department',
        'apt.lup.documentType',
        'apt.lup.location',
        'apt.lup.model',
        //'apt.lup.paymentType',
        'apt.lup.position',
        'apt.lup.premium',
        'apt.lup.profession',
        'apt.lup.saleitemGroup',
        'apt.lup.saleitemUnit',
        'apt.lup.staffGroup',
        'apt.lup.tax',
        'apt.lup.template',
        'apt.lup.type',
        'apt.lup.typeGroup',
        'apt.app999'
    ])
        .constant('uiDatetimePickerConfig', {
            dateFormat          : 'dd.MM.yyyy HH:mm',
            defaultTime         : '00:00:00',
            html5Types          : {
                date            : 'dd.MM.yyyy',
                'datetime-local': 'dd.MM.yyyyTHH:mm:ss.sss',
                'month'         : 'yyyy-MM'
            },
            initialPicker       : 'date',
            reOpenDefault       : false,
            enableDate          : true,
            enableTime          : true,
            buttonBar           : {
                show : true,
                now  : {
                    show: false,
                    text: 'Now'
                },
                today: {
                    show: false,
                    text: 'Today'
                },
                clear: {
                    show: false,
                    text: 'Clear'
                },
                date : {
                    show: true,
                    text: 'Date'
                },
                time : {
                    show: true,
                    text: 'Time'
                },
                close: {
                    show: false,
                    text: 'Close'
                }
            },
            closeOnDateSelection: true,
            appendToBody        : false,
            altInputFormats     : [],
            ngModelOptions      : {}
        });


})();
