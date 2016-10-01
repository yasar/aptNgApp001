/**
 * Created by unal on 16.08.2016.
 */

(function () {
    var _name   = 'setPrice';
    var builder = saleitemPriceBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            scope           : true,
            bindToController: {
                item            : '<',
                setSelectedPrice: '&'
            }
        }
    }

    Controller.$inject = ['$injector'];
    function Controller($injector) {

        var vm = this;

        var service      = $injector.get(builder.getServiceName('service'));
        vm.setPrice      = setPriceFn;
        vm.selectPrice   = selectPriceFn;
        vm.prices        = service.getRepo();
        vm.selectedPrice = vm.item;
        service.loadRepo({saleitem_id: vm.item.saleitem_id, is_active: 1, price_type: 'sale'});

        function setPriceFn() {
            if (angular.isFunction(vm.setSelectedPrice)) {
                vm.setSelectedPrice({data: vm.selectedPrice});
            }
        }

        function selectPriceFn(price) {
            vm.selectedPrice = price;
            setPriceFn();
        }


    }
})();