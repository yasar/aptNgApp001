/**
 * Created by abdullah on 12.01.2016.
 */

(function () {

    angular.module('apt.app001.seller').config(fn);

    fn.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider', 'RestangularProvider'];
    function fn($routeSegmentProvider, enums, RestangularProvider) {

        /**
         * Show the dashboard on initial load.
         */
        $routeSegmentProvider
            .when('/seller', 'main.app001.seller', {
                access    : {
                    loginRequired: true,
                    permissions  : ['access_seller_menu']
                },
                Label     : 'seller',
                redirectTo: '/seller/list'
            })
            .when('/seller/list', 'main.app001.seller.list', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_seller_menu', 'read_seller_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'sellers',
                parent: '/'
            })
            .when('/seller/new', 'main.app001.seller.new', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_seller_menu', 'create_seller_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'New person',
                parent: '/seller'
            })
            //.when('/seller/new_person', 'main.app001.seller.new_person', {
            //    access: {
            //        loginRequired      : true,
            //        permissions        : ['access_seller_menu', 'create_seller_module'],
            //        permissionCheckType: enums.permissionCheckType.combinationRequired
            //    },
            //    label : 'New person',
            //    parent: '/seller'
            //})
            //
            //.when('/seller/new_entity', 'main.app001.seller.new_entity', {
            //    access: {
            //        loginRequired      : true,
            //        permissions        : ['access_seller_menu', 'create_seller_module'],
            //        permissionCheckType: enums.permissionCheckType.combinationRequired
            //    },
            //    label : 'New seller',
            //    parent: '/seller'
            //})
            .when('/seller/:id/edit', 'main.app001.seller.edit', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_seller_menu', 'update_seller_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Edit',
                parent: '/seller'
            })

            .when('/seller/report', 'main.app001.seller.report', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_seller_report_menu'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                }
            })


            .within('main')
            .within('app001')
            .segment('seller', {
                template  : '<div app-view-segment="3"></div>',
                controller: 'SellerLayoutCtrl'
            })

            .within()
            .segment('list', {
                template  : '<apt-panel><div data-apt-seller-list></div></apt-panel>',
                controller: 'SellerListCtrl'
            })
            .segment('new', {
                template  : '<section data-apt-seller-form></section>',
                controller: 'SellerNewCtrl'
            })
            .segment('edit', {
                template    : '<section data-apt-seller-form seller-id="seller_id"></section>',
                controller  : 'SellerEditCtrl',
                dependencies: ['id'],
                access      : {
                    loginRequired: true,
                    auth         : {
                        menu: enums.right.delete
                    }
                }
            })

    };

})();
