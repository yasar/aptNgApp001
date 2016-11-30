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
    others2: [
        {
            name         : couponBuilder.segment('view'),
            url          : couponBuilder.url(':id'),
            ncyBreadcrumb: {
                label: 'View'
            },
            template     : '<apt-mast-profile data="data"></apt-mast-profile>',
            resolve      : {
                data: ['MastModel', '$stateParams',
                    function (MastModel, $stateParams) {
                        var mast_id = $stateParams.id;
                        return MastModel.one(mast_id).one('view').get().then(function (data) {
                            return data.plain();
                        });
                    }],
            },
            controller   : ['$scope', 'data', 'aptTempl',
                function ($scope, data, aptTempl) {
                    aptTempl.config.showSidebarLeft  = false;
                    aptTempl.config.showSidebarRight = false;

                    $scope.data = data;
                }]
        },

        {
            name         : couponBuilder.segment('edit'),
            url          : couponBuilder.url(':id/edit'),
            ncyBreadcrumb: {
                skip : false,
                label: 'Edit:{{mastId}}'
            },
            abstract     : false,
            defaultChild : 'setup',
            // template     : '<ui-view></ui-view>',
            template     : '<ui-view><h1 class="text-muted">Select a section to edit.</h1></ui-view>',
            controller   : ['$injector', '$scope', function ($injector, $scope) {
                var aptMenu        = $injector.get('aptMenu');
                var aptTempl       = $injector.get('aptTempl');
                var gettextCatalog = $injector.get('gettextCatalog');
                var $state         = $injector.get('$state');
                var $timeout       = $injector.get('$timeout');

                $scope.mastId = $state.params.id;

                $scope.insideMenuSections = aptMenu.Item()
                    .addChild({
                        text   : 'Setup',
                        icon   : couponBuilder.icon,
                        segment: couponBuilder.segment('edit.setup'),
                        auth   : [couponBuilder.permission('u')]
                    });

                aptTempl.setSlotRouteSegment();

                // aptTempl.reset(true);
                aptTempl.setSlotItem('sidebarLeft', 'mastSections', {
                    title   : gettextCatalog.getString('Sections'),
                    body    : '<ul apt-menu-builder menu-type="limitless" ng-model="insideMenuSections" ' +
                              'class="navigation navigation-alt navigation-accordion" btn-size="xs"> </ul>',
                    _scopeId: $scope.$id
                });

            }],
            access       : {
                permission: [couponBuilder.permission('u')]
            },
        },

    ]
});