/**
 * Created by yasar on 20.12.2015.
 */

(function () {
    
    angular.module('apt.app001-tablet', [
               'apt.app001.route',
               'apt.app001.icons',
               'apt.app001.application', // disabled temporarily
               'apt.app001.card',
               'apt.app001.cardFund',
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
               'apt.app998',
               'apt.app998.lup',
               'apt.app998.brand',
               'apt.app998.clientGroup',
               'apt.app998.currency',
               'apt.app998.department',
               'apt.app998.documentType',
               'apt.app998.location',
               'apt.app998.model',
               //'apt.app998.paymentType',
               'apt.app998.position',
               'apt.app998.premium',
               'apt.app998.profession',
               'apt.app998.saleitemGroup',
               'apt.app998.saleitemUnit',
               'apt.app998.staffGroup',
               'apt.app998.tax',
               'apt.app998.template',
               'apt.app999',
               'apt.app999.accessLevel',
               'apt.app999.accessRight',
               'apt.app999.address',
               'apt.app999.branch',
               'apt.app999.client',
               'apt.app999.entity',
               'apt.app999.image',
               'apt.app999.my',
               'apt.app999.person',
               'apt.app999.searchAll',
               'apt.app999.setting',
               'apt.app999.staff',
               'apt.app999.user',
               'apt.app999.type',
               'apt.app999.typeGroup',
//               'apt.app999.vacation',
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
