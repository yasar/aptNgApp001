/**
 * Created by abdullah on 12.01.2016.
 */

(function () {

    var builder = clientBuilder;
    angular.module(builder.getModuleName()).config(fn);

    fn.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider', 'RestangularProvider'];
    function fn($routeSegmentProvider, enums, RestangularProvider) {

        /**
         * Show the dashboard on initial load.
         */
        $routeSegmentProvider
            .when('/client', 'main.app001.client', {
                access    : {
                    loginRequired: true,
                    permissions  : ['access_client_menu']
                },
                label     : 'Client',
                redirectTo: '/client/list'
            })
            .when('/client/list', 'main.app001.client.list', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_client_menu', 'read_client_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Clients',
                parent: '/'
            })
            .when('/client/new', 'main.app001.client.new', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_client_menu', 'create_client_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'New person',
                parent: '/client'
            })

            .when('/client/:id/edit', 'main.app001.client.edit', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_client_menu', 'update_client_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Edit',
                parent: '/client'
            })

            .when('/client/report', 'main.app001.client.report', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_client_report_menu'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                }
            })


            .within('main')
            .within('app001')
            .segment('client', {
                template  : '<div app-view-segment="3"></div>',
                controller: builder.getControllerName('layout')
            })

            .within()
            .segment('list', {
                template  : '<apt-panel><div data-apt-client-list data-view-type="media" data-edit-conf="editConf" data-add-new-conf="addNewConf"></div></apt-panel>',
                controller: builder.getControllerName('list')
            })
            .segment('new', {
                template  : '<section data-apt-client-form></section>',
                controller: builder.getControllerName('new')
            })
            .segment('edit', {
                template    : '<section data-apt-client-form client-id="client_id"></section>',
                controller  : builder.getControllerName('edit'),
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
