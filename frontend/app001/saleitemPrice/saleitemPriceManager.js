/**
 * Created by unal on 19.03.2016.
 */


(function () {
    return false;
    var domain        = 'saleitemPrice',
        path          = 'app001/' + domain,
        tpl           = 'manager',
        directiveName = _.upperFirst(domain) + 'Manager';

    angular
        .module('apt.app001.' + domain)
        .directive('apt' + directiveName, fn);

    function fn() {
        return {
            restrict        : 'A',
            scope           : {},
            controller      : controllerFn,
            controllerAs    : 'vm' + directiveName,
            templateUrl     : path + '/' + tpl + '.tpl.html',
            bindToController: {
                saleitemId: '='

            }
        }
    }

    controllerFn.$inject = ['$scope', 'NotifyingService'];

    function controllerFn($scope, NotifyingService) {

        var vm = this;

        vm.saleItemPriceId = null;

        NotifyingService.subscribe($scope, 'saleitemPrice.formDataLoaded', function (event, data) {
            data.saleitem_id = vm.saleitemId;
        });

        NotifyingService.subscribe($scope, 'saleitemPrice:selectedItem', function (event, data) {
            vm.saleItemPriceId = data.saleitem_price_id;
            $scope.$apply();
        });
    }

})();