/**
 * Created by unal on 22.08.2016.
 */


(function () {
    var _name   = 'mostSoldSaleitem';
    var builder = saleitemBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            scope           : {},
            bindToController: true,
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['$injector', '$scope'];

    function Controller($injector, $scope) {

        var vm                  = this;
        var saleitemService     = $injector.get(builder.getServiceName('service'));
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var ShoppingCartService = $injector.get('ShoppingCartService');

        vm.client         = CashSaleDataService.getData().client;
        vm.selectSaleitem = selectSaleitemFn;
        $scope.$watch(function () {
            return vm.client.client_id;
        }, function (newVal, oldVal) {

            if (_.isUndefined(newVal) || _.isEqual(newVal, oldVal)) {
                return;
            }
            vm.mostSoldFilter = {
                client_id: vm.client.client_id
            }
        }, true);

        /*
         function loadSaleitems() {
         saleitemService.getMostSoldSaleitem({client_id: vm.client.client_id}).then(function (data) {
         vm.saleItems = data;
         });
         }*/

        function selectSaleitemFn(data) {
            ShoppingCartService.addItem(data);
        }

    }

})();
