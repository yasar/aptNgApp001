/**
 * Created by unal on 23.03.2016.
 */

(function () {
    var builder = cardBuilder;
    angular.module(builder.getModuleName()).controller(builder.getControllerName('list'), Controller);

    Controller.$inject = ['$scope', 'aptMenu', 'aptTempl',
        'gettextCatalog', 'aptUtils', '$rootScope',
        'restOperationService', '$routeSegment'];

    function Controller($scope, Menu, Templ, gettextCatalog,
                        aptUtils, $rootScope, restOp, $routeSegment) {

        Templ.config.showSidebarLeft = true;

        $scope.cardType = aptUtils.getUrlSearchParamValue('cardType', 'in_use');

        var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
            $scope.cardType = aptUtils.getUrlSearchParamValue('cardType');
            init();
        });

        $scope.$on('$destroy', function (event, next, current) {
            listener1();
        });

        // Templ.setSlotRouteSegment();

        init();
        initInsideMenu();
        function init() {
            Templ.page.subTitle = _.upperCase(gettextCatalog.getString($scope.cardType, null, 'cardType'));
        }

        function initInsideMenu() {
            $scope.insideMenu = Menu.get('insideMenu').clear()
                .addChild({
                    text : gettextCatalog.getString('In use'),
                    icon : 'icon-vcard',
                    class: 'bg-teal-400',
                    click: function () {
                        aptUtils.setUrlSearchParamValue('cardType', 'in_use');
                    },
                    auth : ['read_card_module']
                })
                .addChild({
                    text : gettextCatalog.getString('Unused'),
                    icon : 'icon-stack-empty',
                    class: 'bg-orange-400',
                    click: function () {
                        aptUtils.setUrlSearchParamValue('cardType', 'free');
                    },
                    auth : ['read_card_module']
                })
                .addChild({
                    text : gettextCatalog.getString('Import'),
                    icon : 'icon-import',
                    class: 'bg-default',
                    click: function () {
                        aptUtils.goto({segment: 'main.app001.card.new'});
                    },
                    auth : ['create_card_module']
                });

            $scope.insideMenuConfig = {
                liHasSubMenuClass: '',
                ulIsSubMenuClass : 'sub-menu',
                columnCount      : 2
            };

            Templ.setSlotItem('sidebarLeft', 'card-type-filter', {
                title        : gettextCatalog.getString('Card Type'),
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

        Menu.get('moduleMenu').clear();
        // .addChild({
        //     text : 'New Card',
        //     icon : 'icon-credit-card',
        //     class: 'btn bg-teal-400 btn-xs',
        //     href : $routeSegment.getSegmentUrl('main.app001.card.new'),
        //     auth : ['create_card_module'],
        //     click: function () {
        //         return true;
        //     }
        // })

    }
})();