/**
 * Created by unal on 30.03.2016.
 */

(function () {
    angular.module('apt.app001.cashSale').config(routeConfig);
    var builder = cashSaleBuilder;

    routeConfig.$inject = ['$routeSegmentProvider', 'aptAuthEnumServiceProvider'];
    function routeConfig($routeSegmentProvider, enums) {

        $routeSegmentProvider
            .when('/cash-sale', 'main.app001.cashSale', {
                access: {
                    loginRequired      : true,
                    permissions        : ['access_cash_sale_menu', 'read_cash_sale_module'],
                    permissionCheckType: enums.permissionCheckType.combinationRequired
                },
                label : 'Cash Sale'
            })

            .within('main')
            .within('app001')
            .segment('cash-sale', {
                template  : '<div data-apt-cash-sale-manager ></div>',
                controller: builder.getControllerName('layout'),
            })
        ;
    }
})();