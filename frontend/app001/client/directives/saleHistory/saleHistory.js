/**
 * Created by unal on 22.08.2016.
 */


(function () {
    var _name   = 'saleHistory';
    var builder = clientBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'AE',
            bindToController: {
                item: '='
            },
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
        };
    }

    Controller.$inject = ['$injector', '$scope'];
    function Controller($injector, $scope) {
        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));


        vm.tableOptions = {
            showAddNewButton: false,
            //addRowIndex     : false,
            addRowMenu      : false,
            showReloadButton: false
        };

        loadSaleHistory();

        function loadSaleHistory() {
            if (!vm.item) {
                return;
            }
            service.getSaleHistory(vm.item.client_id).then(function (data) {
                vm.sales    = data;
                vm.total    = 0;
                vm.discount = 0;
                if (data.length >= 2) {
                    vm.firstSaleDate = data[0].timestamp;
                    vm.lastSaleDate  = data[data.length - 1].timestamp
                }

                angular.forEach(data, function (sale) {
                    vm.total += sale.grand * 1;
                    vm.discount += sale.discount * 1;
                });
            });
        }

    }


})();