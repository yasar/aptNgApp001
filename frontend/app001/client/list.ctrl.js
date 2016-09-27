// /**
//  * Created by unal on 23.03.2016.
//  */
//
// (function () {
//     var builder = clientBuilder;
//     var name    = 'list';
//     angular.module(builder.getModuleName()).controller(builder.getControllerName(name), Controller);
//
//     Controller.$inject = ['$scope', 'aptMenu', 'aptTempl',
//         'gettextCatalog', 'aptUtils', 'dialogs',
//         '$templateCache', '$injector'];
//
//     function Controller($scope, Menu, Templ, gettextCatalog,
//                         aptUtils, dialogs, $templateCache, $injector) {
//         var builder = clientBuilder;
//         var service = $injector.get(builder.getServiceName('service'));
//
//         $scope.clientType = aptUtils.getUrlSearchParamValue('clientType');
//
//         var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
//             $scope.clientType = aptUtils.getUrlSearchParamValue('clientType');
//             init();
//         });
//
//         /**
//          * for add new
//          * @type {{suffix: string}}
//          */
//         $scope.addNewConf = {
//             suffix: 'manager'
//         };
//         //
//         /**
//          * for edit
//          * @type {{suffix: string}}
//          */
//         $scope.addNewConf = {
//             suffix: 'manager'
//         };
//
//         $scope.$on('$destroy', function (event, next, current) {
//             listener1();
//         });
//
//         Templ.setSlotRouteSegment();
//
//         init();
//         initInsideMenu();
//         function init() {
//             if (!$scope.clientType) {
//                 $scope.clientType = 'person';
//             }
//
//             Templ.page.subTitle = +_.upperCase($scope.clientType);
//         }
//
//         function initInsideMenu() {
//             $scope.insideMenu = Menu.get('insideMenu').clear()
//                 .addChild({
//                     text : gettextCatalog.getString(personBuilder.title),
//                     icon : personBuilder.icon,
//                     class: 'bg-teal-400',
//                     click: function () {
//                         aptUtils.setUrlSearchParamValue('clientType', 'person');
//                     },
//                     auth : ['read_client_module']
//                 })
//                 .addChild({
//                     text : gettextCatalog.getString(entityBuilder.title),
//                     icon : entityBuilder.icon,
//                     class: 'bg-orange-400',
//                     click: function () {
//                         aptUtils.setUrlSearchParamValue('clientType', 'entity');
//                     },
//                     auth : ['read_client_module']
//                 });
//
//             $scope.insideMenuConfig = {
//                 liHasSubMenuClass: '',
//                 ulIsSubMenuClass : 'sub-menu',
//                 columnCount      : 2
//             };
//
//             Templ.setSlotItem('sidebarLeft', 'offer-type-filter', {
//                 title        : gettextCatalog.getString('Client Type'),
//                 body         : '<div apt-menu-builder ' +
//                                'data-menu-type="slotButtonMenu" ' +
//                                'data-ng-model="insideMenu" ' +
//                                'class="p-10 alpha-brown" ' +
//                                'data-btn-size="xs" ' +
//                                'data-config="insideMenuConfig"> </div>',
//                 isCollapsed  : false,
//                 isCollapsable: false,
//                 showTitle    : false,
//                 _scopeId     : $scope.$id
//             });
//
//         }
//
//         Menu.get('moduleMenu').clear()
//             .addChild({
//                 text  : gettextCatalog.getString('Quick Client'),
//                 icon  : 'icon-user-tie',
//                 class : 'btn bg-teal-400 btn-xs',
//                 auth  : ['create_client_module'],
//                 click : service.addQuickClient
//             });
//     }
// })();