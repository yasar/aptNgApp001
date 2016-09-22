/**
 * Created by unal on 05.01.2016.
 */
(function () {
return false;
    var route = 'nexus/price';

    angular.module('apt.app001.saleitem').config(ConfigFn).factory('PriceModel', fn);


    ConfigFn.$inject = ['RestangularProvider'];

    function ConfigFn(RestangularProvider) {

        RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response, deferred) {

            var checkRoute = RestangularProvider.configuration.baseUrl + '/' + route;
            if (url.indexOf(checkRoute) !== 0) return data;
            if (operation !== 'get'
                && operation !== 'getList'
                && operation !== 'customGET'
                && operation !== 'put'
                && operation !== 'post') return data;

            var fix = function (data) {

                if (data.is_tax_included !== null) {
                    data.is_tax_included = Number(data.is_tax_included);
                }

                if (data.is_active !== null) {
                    data.is_active = Number(data.is_active);
                }
                return data;
            };

            if (angular.isArray(data)) {
                angular.forEach(data, function (item) {
                    fix(item);
                });
            } else {
                fix(data);
            }

            return data;

        });

    };

    fn.$inject = ['Restangular'];


    function fn(Restangular) {
        var rest = Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: 'price_id'
            });
        });

        return rest.service('nexus/price');
    }
})();