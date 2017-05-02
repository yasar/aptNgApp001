_.merge(couponBuilder.routeConfig, {
    layout: {
        abstract    : true,
        defaultChild: 'list'
    },
    list  : {
        controller: ['$injector', '$scope', function ($injector, $scope) {
            var aptUtils       = $injector.get('aptUtils');
            var aptTempl       = $injector.get('aptTempl');
            var aptMenu        = $injector.get('aptMenu');
            var gettextCatalog = $injector.get('gettextCatalog');

            $scope.couponType = aptUtils.getUrlSearchParamValue('couponType');

            var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
                $scope.couponType = aptUtils.getUrlSearchParamValue('couponType');
                init();
            });

            $scope.$on('$destroy', function (event, next, current) {
                listener1();
            });

            aptTempl.setSlotRouteSegment();

            init();
            // initInsideMenu();
            function init() {
                if (!$scope.couponType) {
                    $scope.couponType = 'mail';
                }

                // aptTempl.page.title = 'Coupon List - ' + _.upperCase($scope.couponType);
                aptTempl.page.title = 'Coupon List';
                aptTempl.page.icon  = couponBuilder.icon;
            }

            function initInsideMenu() {
                $scope.filter     = {};
                $scope.insideMenu = aptMenu.get('insideMenu').clear()
                    .addChild({
                        text : 'SMS',
                        icon : 'icon-user-tie',
                        class: 'bg-teal-400',
                        click: function () {
                            aptUtils.setUrlSearchParamValue('couponType', 'sms');
                        },
                        auth : ['read_coupon_module']
                    })
                    .addChild({
                        text : 'Email',
                        icon : 'icon-portfolio',
                        class: 'bg-orange-400',
                        click: function () {
                            aptUtils.setUrlSearchParamValue('couponType', 'email');
                        },
                        auth : ['read_coupon_module']
                    });

                $scope.insideMenuConfig = {
                    liHasSubMenuClass: '',
                    ulIsSubMenuClass : 'sub-menu',
                    columnCount      : 2
                };

                aptTempl.setSlotItem('sidebarLeft', 'coupon-type-filter', {
                    title        : gettextCatalog.getString('Coupon Type'),
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

            $scope.editConf = {
                suffix: 'manager'
            };
        }]
    },
});