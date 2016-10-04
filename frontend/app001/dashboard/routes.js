/**
 * Created by unal on 20.02.2016.
 */


(function () {
    var builder = dashboardBuilder;

    angular.module('apt.app001.dashboard').config(Config);

    Config.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider'];

    function Config($routeSegmentProvider, enums) {

        /**
         * Show the dashboard on initial load.
         */
        $routeSegmentProvider
            .when('/dashboard', 'main.app001.dashboard', {
                access: {
                    loginRequired: true,
                    permissions  : ['access_dashboard_menu']
                },
                label : 'Dashboard'
            })
            .within('main')
            .within('app001')
            .segment('dashboard', {
                template    : builder.getLayoutTemplate(),
                controller  : builder.getControllerName('layout'),
                controllerAs: builder.getControllerAsName('layout'),
                access      : {
                    loginRequired: true
                }
            })

        ;
    }
})();