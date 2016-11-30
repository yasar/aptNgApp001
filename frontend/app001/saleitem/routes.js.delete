/**
 * Created by murat on 24.12.2015.
 */

(function () {
    var builder = saleitemBuilder;
    angular
        .module(builder.getModuleName())
        .config(routeConfig);

    routeConfig.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider'];

    function routeConfig($routeSegmentProvider, enums) {
        $routeSegmentProvider
            .when('/saleitem', 'main.app001.saleitem', {
                access    : {
                    loginRequired: true,
                    permissions  : ['access_saleitem_menu']
                },
                label     : 'Saleitem',
                redirectTo: '/saleitem/list'
            })
            .when('/saleitem/list', 'main.app001.saleitem.list', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_saleitem_menu', 'read_saleitem_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'List'
            })
            .when('/saleitem/:id/edit', 'main.app001.saleitem.edit', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_saleitem_menu', 'update_saleitem_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Edit',
                parent: '/saleitem'
            })

            .when('/saleitem/:id/price', 'main.app001.saleitem.price', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_saleitem_menu', 'update_saleitem_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Price',
                parent: '/saleitem'
            })

            .when('/saleitem/:id/package', 'main.app001.saleitem.package', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_saleitem_menu', 'update_saleitem_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Package',
                parent: '/saleitem'
            })

            .within('main')
            .within('app001')
            .segment('saleitem', {
                template  : '<div app-view-segment="3"></div>',
                controller: builder.getControllerName('layout')
            })
            .within()
            .segment('list', {
                template  : '<apt-panel><div data-apt-saleitem-list edit-conf="vmSaleitemList.editConf" add-new-conf="vmSaleitemList.addNewConf"></div></apt-panel>',
                controller: builder.getControllerName('list'),
                controllerAs  : builder.getControllerAsName('list'),
            })
            .segment('edit', {
                template    : '<div data-apt-saleitem-form item="vmSaleitem.saleitem_id"></div>',
                controller  : builder.getControllerName('edit'),
                controllerAs  : builder.getControllerAsName('edit'),
                dependencies: ['id'],
                access      : {
                    loginRequired: true,
                    auth         : {
                        menu: enums.right.delete
                    }
                }
            })
            .segment('price', {
                template    : '<div data-apt-saleitem-price-manager saleitem-id="saleitem_id"></div>',
                //template    : 'Price',
                controller  : 'SaleitemEditCtrl',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

            .segment('package', {
                template    : '<div data-apt-saleitem-package-manager saleitem-id="saleitem_id"></div>',
                controller  : 'SaleitemEditCtrl',
                dependencies: ['id'],
                icon        : 'icon-link2'
            })

        ;
    }
})();