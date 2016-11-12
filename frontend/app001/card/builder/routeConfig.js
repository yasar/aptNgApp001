/**
 * Created by yasar on 26.09.2016.
 */
_.merge(cardBuilder.routeConfig, {
    templConfig: {
        showSidebarLeft : true,
        showSidebarRight: false,
    },
    list       : {
        controller: ['$scope', '$injector',
            function ($scope, $injector) {

                var service        = $injector.get(cardBuilder.getServiceName('service'));
                var aptUtils       = $injector.get('aptUtils');
                var aptMenu        = $injector.get('aptMenu');
                var aptTempl       = $injector.get('aptTempl');
                var gettextCatalog = $injector.get('gettextCatalog');
                var listener1      = $scope.$on('$routeChangeSuccess', function (event, next, current) {
                    $scope.cardType = aptUtils.getUrlSearchParamValue('cardType');
                    init();
                });

                aptMenu.get('moduleMenu').clear();
                $scope.cardType = aptUtils.getUrlSearchParamValue('cardType', 'in_use');
                $scope.$on('$destroy', function (event, next, current) {
                    listener1();
                });

                init();
                initInsideMenu();


                function init() {
                    aptTempl.page.subTitle = _.upperCase(gettextCatalog.getString($scope.cardType, null, 'cardType'));
                }

                function initInsideMenu() {
                    $scope.insideMenu = aptMenu.get('insideMenu').clear()
                        .addChild({
                            text : 'In use',
                            icon : 'icon-file-text2',
                            class: 'bg-teal-400',
                            click: function () {
                                aptUtils.setUrlSearchParamValue('cardType', 'in_use');
                            },
                            auth : ['read_card_module']
                        })
                        .addChild({
                            text : 'Unused',
                            icon : 'icon-file-empty',
                            class: 'bg-orange-400',
                            click: function () {
                                aptUtils.setUrlSearchParamValue('cardType', 'free');
                            },
                            auth : ['read_card_module']
                        })
                        .addChild({
                            text : 'Import',
                            icon : 'icon-import',
                            class: 'bg-default',
                            click: function () {
                                aptUtils.popupDirective(cardBuilder, 'import');
                            },
                            auth : ['create_card_module']
                        });

                    $scope.insideMenuConfig = {
                        liHasSubMenuClass: '',
                        ulIsSubMenuClass : 'sub-menu',
                        columnCount      : 2,
                        translate        : true
                    };

                    aptTempl.setSlotItem('sidebarLeft', 'card-type-filter', {
                        title        : gettextCatalog.getString('Card Type'),
                        body         : '<div apt-menu-builder ' +
                                       'data-menu-type="slotButtonMenu" ' +
                                       'data-ng-model="insideMenu"' +
                                       'class="p-10 alpha-brown" ' +
                                       'data-btn-size="xs" ' +
                                       'data-config="insideMenuConfig"> </div>',
                        isCollapsed  : false,
                        isCollapsable: false,
                        showTitle    : false,
                        _scopeId     : $scope.$id
                    });

                }
            }]
    }
});