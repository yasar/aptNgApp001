/**
 * Created by unal on 19.03.2016.
 */

(function () {
    angular.module('apt.app001.coupon').config(fn);

    fn.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider'];

    function fn($routeSegmentProvider, enums) {


        $routeSegmentProvider

            .when('/coupon', 'main.app001.coupon', {
                access    : {
                    loginRequired: true,
                    permissions  : ['access_coupon_menu']
                },
                label     : 'Coupon',
                redirectTo: '/coupon/list'
            })
            .when('/coupon/list', 'main.app001.coupon.list', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_message_menu', 'read_message_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Coupons',
                parent: '/'
            })
            .when('/coupon/new', 'main.app001.coupon.new', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'create_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'New coupon',
                parent: '/coupon'
            })

            .when('/coupon/:id', 'main.app001.coupon.view', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'read_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'View',
                parent: '/coupon'
            })
            .when('/coupon/:id/edit', 'main.app001.coupon.edit', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Edit',
                parent: '/coupon'
            })

            .when('/coupon/:id/condition', 'main.app001.coupon.condition', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Condition',
                parent: '/coupon'
            })

            .when('/coupon/:id/subject', 'main.app001.coupon.subject', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Subject',
                parent: '/coupon'
            })
            .when('/coupon/:id/target', 'main.app001.coupon.target', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Target',
                parent: '/coupon'
            })

            .when('/coupon/:id/requirement', 'main.app001.coupon.requirement', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Requirement',
                parent: '/coupon'
            })

            .when('/coupon/:id/reward', 'main.app001.coupon.reward', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_coupon_menu', 'update_coupon_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Reward',
                parent: '/coupon'
            })

            .within('main')
            .within('app001')
            .segment('coupon', {
                template    : couponBuilder.getLayoutTemplate(),
                controller  : couponBuilder.getControllerName('layout'),
                controllerAs: couponBuilder.getControllerAsName('layout')
            })
            // .segment('coupon', {
            //     templateUrl: 'app001/coupon/layout.tpl.html',
            //     controller : 'CouponLayoutCtrl'
            // })
            .within()
            .segment('list', {
                template  : '<apt-panel><section data-apt-coupon-list edit-conf="editConf" filter="filter"></section></apt-panel>',
                controller: 'CouponListCtrl'
            })
            .segment('new', {
                template  : '<section data-apt-coupon-form></section>',
                controller: 'CouponNewCtrl'
            })
            .segment('view', {
                templateUrl : 'app001/coupon/overview.tpl.html',
                controller  : 'CouponViewCtrl',
                dependencies: ['id'],
            })
            .segment('edit', {
                template    : 'edit controller',
                controller  : 'CouponEditCtrl',
                dependencies: ['id'],
                access      : {
                    loginRequired: true,
                    auth         : {
                        menu: enums.right.delete
                    }
                }
            })
            .segment('condition', {
                template    : '<apt-panel><div data-apt-coupon-condition-list filter="{coupon_id:vmCouponCondition.couponId}"></div></apt-panel>',
                controller  : ['$injector', function ($injector) {
                    var $routeSegment = $injector.get('$routeSegment'),
                        vm            = this;
                    vm.couponId       = $routeSegment.$routeParams.id;
                }],
                controllerAs: 'vmCouponCondition',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })
            .segment('subject', {
                template    : '<apt-panel><div data-apt-coupon-subject-list filter="{coupon_id:vmCouponSubject.couponId}"></div></apt-panel>',
                controller  : ['$injector', function ($injector) {
                    var $routeSegment = $injector.get('$routeSegment'),
                        vm            = this;
                    vm.couponId       = $routeSegment.$routeParams.id;
                }],
                controllerAs: 'vmCouponSubject',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

            .segment('target', {
                template    : '<apt-panel><div data-apt-coupon-target-list filter="{coupon_id:vmCouponTarget.couponId}"></div></apt-panel>',
                controller  : ['$injector', function ($injector) {
                    var $routeSegment = $injector.get('$routeSegment'),
                        vm            = this;
                    vm.couponId       = $routeSegment.$routeParams.id;
                }],
                controllerAs: 'vmCouponTarget',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

            .segment('requirement', {
                template    : '<apt-panel><div data-apt-coupon-requirement-list filter="{coupon_id:vmCouponRequirement.couponId}"></div></apt-panel>',
                controller  : ['$injector', function ($injector) {
                    var $routeSegment = $injector.get('$routeSegment'),
                        vm            = this;
                    vm.couponId       = $routeSegment.$routeParams.id;
                }],
                controllerAs: 'vmCouponRequirement',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

            .segment('reward', {
                template    : '<apt-panel><div data-apt-coupon-reward-list filter="{coupon_id:vmCouponReward.couponId}"></div></apt-panel>',
                controller  : ['$injector', function ($injector) {
                    var $routeSegment = $injector.get('$routeSegment'),
                        vm            = this;
                    vm.couponId       = $routeSegment.$routeParams.id;
                }],
                controllerAs: 'vmCouponReward',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

    }
})();