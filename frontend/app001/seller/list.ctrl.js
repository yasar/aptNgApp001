/**
 * Created by unal on 23.03.2016.
 */

(function () {
    angular.module('apt.app001.seller').controller('SellerListCtrl', Fn);

    Fn.$inject = ['$scope', 'aptMenu', 'aptTempl',
        'gettextCatalog', 'aptUtils', '$rootScope',
        'restOperationService', '$injector'];

    function Fn($scope, Menu, Templ, gettextCatalog,
                aptUtils, $rootScope, restOp, $injector) {

        $scope.sellerType = aptUtils.getUrlSearchParamValue('sellerType');

        var service = $injector.get(sellerBuilder.getServiceName('service'));

        var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
            $scope.sellerType = aptUtils.getUrlSearchParamValue('sellerType');
            init();
        });

        $scope.$on('$destroy', function (event, next, current) {
            listener1();
        });

        Templ.setSlotRouteSegment();

        init();
        initInsideMenu();
        function init() {
            if (!$scope.sellerType) {
                $scope.sellerType = 'person';
            }

            Templ.page.subTitle = gettextCatalog.getString(_.upperFirst($scope.sellerType));
        }

        function initInsideMenu() {
            $scope.insideMenu = Menu.get('insideMenu').clear()
                .addChild({
                    text : gettextCatalog.getString(personBuilder.title),
                    icon : personBuilder.icon,
                    class: 'bg-teal-400',
                    click: function () {
                        aptUtils.setUrlSearchParamValue('sellerType', 'person');
                    },
                    auth : ['read_seller_module']
                })
                .addChild({
                    text : gettextCatalog.getString(entityBuilder.title),
                    icon : entityBuilder.icon,
                    class: 'bg-orange-400',
                    click: function () {
                        aptUtils.setUrlSearchParamValue('sellerType', 'entity');
                    },
                    auth : ['read_seller_module']
                });

            $scope.insideMenuConfig = {
                liHasSubMenuClass: '',
                ulIsSubMenuClass : 'sub-menu',
                columnCount      : 2
            };

            Templ.setSlotItem('sidebarLeft', 'seller-type-filter', {
                title        : gettextCatalog.getString('Seller Type'),
                body         : '<div apt-menu-builder ' +
                'data-menu-type="slotButtonMenu" ' +
                'data-ng-model="insideMenu" ' +
                'class="p-10 alpha-brown" ' +
                'data-btn-size="xs" ' +
                'data-config="insideMenuConfig"> </div>',
                isCollapsed  : false,
                isCollapsable: false,
                showTitle    : false,
                _scopeId     : $scope.$id
            });

        }

        Menu.get('moduleMenu').clear()
            .addChild({
                text : gettextCatalog.getString('Quick Seller'),
                icon : 'icon-user-tie',
                class: 'btn bg-teal-400 btn-xs',
                auth : ['create_seller_module'],
                click: service.addQuickSeller
            });
    }
})();