// (function () {
//     angular.module(couponBuilder.getModuleName()).controller(couponBuilder.getControllerName('list'), Controller);
//
//     Controller.$inject = ['$scope', 'aptMenu', 'aptTempl',
//         'gettextCatalog', 'aptUtils', '$rootScope',
//         'restOperationService', '$routeSegment'];
//
//     function Controller($scope, Menu, Templ, gettextCatalog,
//                         aptUtils, $rootScope, restOp, $routeSegment) {
//
//         $scope.couponType = aptUtils.getUrlSearchParamValue('couponType');
//
//         var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
//             $scope.couponType = aptUtils.getUrlSearchParamValue('couponType');
//             init();
//         });
//
//         $scope.$on('$destroy', function (event, next, current) {
//             listener1();
//         });
//
//         Templ.setSlotRouteSegment();
//
//         init();
//         // initInsideMenu();
//         function init() {
//             if (!$scope.couponType) {
//                 $scope.couponType = 'mail';
//             }
//
//             // Templ.page.title = 'Coupon List - ' + _.upperCase($scope.couponType);
//             Templ.page.title = 'Coupon List';
//             Templ.page.icon  = couponBuilder.icon;
//         }
//
//         function initInsideMenu() {
//             $scope.filter = {};
//             $scope.insideMenu = Menu.get('insideMenu').clear()
//                 .addChild({
//                     text : 'SMS',
//                     icon : 'icon-user-tie',
//                     class: 'bg-teal-400',
//                     click: function () {
//                         aptUtils.setUrlSearchParamValue('couponType', 'sms');
//                     },
//                     auth : ['read_coupon_module']
//                 })
//                 .addChild({
//                     text : 'Email',
//                     icon : 'icon-portfolio',
//                     class: 'bg-orange-400',
//                     click: function () {
//                         aptUtils.setUrlSearchParamValue('couponType', 'email');
//                     },
//                     auth : ['read_coupon_module']
//                 });
//
//             $scope.insideMenuConfig = {
//                 liHasSubMenuClass: '',
//                 ulIsSubMenuClass : 'sub-menu',
//                 columnCount      : 2
//             };
//
//             Templ.setSlotItem('sidebarLeft', 'coupon-type-filter', {
//                 title        : gettextCatalog.getString('Coupon Type'),
//                 body         : '<div apt-menu-builder ' +
//                 'data-menu-type="slotButtonMenu" ' +
//                 'data-ng-model="insideMenu" ' +
//                 'class="p-10 alpha-brown" ' +
//                 'data-btn-size="xs" ' +
//                 'data-config="insideMenuConfig"> </div>',
//                 isCollapsed  : false,
//                 isCollapsable: false,
//                 showTitle    : false,
//                 _scopeId     : $scope.$id
//             });
//
//         }
//
//         $scope.editConf={
//             suffix:'manager'
//         };
//
//         //Menu.get('moduleMenu').clear()
//         //    .addChild({
//         //        text : 'Add New',
//         //        icon : 'icon-user-tie',
//         //        class: 'btn bg-teal-400 btn-xs',
//         //        href : $routeSegment.getSegmentUrl('main.app001.coupon.new'),
//         //        auth : ['create_coupon_module']
//         //    });
//     }
// })();