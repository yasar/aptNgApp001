/**
 * Created by abdullah on 12.01.2016.
 */

(function () {
    var builder = cardBuilder;
    angular.module(builder.getModuleName()).config(fn);

    fn.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider', 'RestangularProvider'];
    function fn($routeSegmentProvider, enums, RestangularProvider) {

        /**
         * Show the dashboard on initial load.
         */
        $routeSegmentProvider
            .when('/card', 'main.app001.card', {
                access    : {
                    loginRequired: true,
                    permissions  : ['access_card_menu']
                },
                Label     : 'Card',
                redirectTo: '/card/list'
            })
            .when('/card/list', 'main.app001.card.list', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_card_menu', 'read_card_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Cards',
                parent: '/'
            })
            .when('/card/new', 'main.app001.card.new', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_card_menu', 'create_card_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'New person',
                parent: '/card'
            })
            .when('/card/:id/edit', 'main.app001.card.edit', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_card_menu', 'update_card_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Edit',
                parent: '/card'
            })

            .when('/card/report', 'main.app001.card.report', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_card_report_menu'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                }
            })


            .within('main')
            .within('app001')
            .segment('card', {
                // templateUrl: 'app001/card/layout.tpl.html',
                template: '<div app-view-segment="3"></div>',
                controller: builder.getControllerName('layout')
            })

            .within()
            .segment('list', {
                template  : '<apt-panel><div data-apt-card-list></div></apt-panel>',
                controller: builder.getControllerName('list')
            })

            .segment('new', {
                template  : '<section data-apt-card-form></section>',
                controller: builder.getControllerName('new')
            })
            .segment('edit', {
                template    : '<section data-apt-card-form card-id="card_id"></section>',
                controller: builder.getControllerName('edit'),
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
