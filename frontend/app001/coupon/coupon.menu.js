// /**
//  * Created by unal on 19.03.2016.
//  */
//
//
// (function () {
//     angular.module('apt.app001.coupon').run(fn);
//
//     fn.$inject = ['aptMenu', '$routeSegment', '$rootScope', 'aptUtils', 'gettextCatalog', 'aptTempl'];
//
//     function fn(Menu, $routeSegment, $rootScope, aptUtils, gettextCatalog, Templ) {
//         Menu.get('enterprise').addChild({
//             text : 'Coupon',
//             icon : 'icon-gift',
//             href : $routeSegment.getSegmentUrl('main.app001.coupon'),
//             auth : ['access_coupon_menu'],
//             order: 72
//         });
//     }
//
// })();