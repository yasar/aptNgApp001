/**
 * Created by unal on 30.03.2016.
 */


(function () {
    var _name   = 'defaultPaymentTypeSelector';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            replace     : true,
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['$injector'];
    function Controller($injector) {

        var vm                     = this;
        var NotifyingService       = $injector.get('NotifyingService');
        var CashSalePaymentService = $injector.get('CashSalePaymentService');
        // var ShoppingCartService = $injector.get('ShoppingCartService');
        var CashSaleDataService    = $injector.get('CashSaleDataService');
        var TypeModel              = $injector.get('TypeModel');

        vm.typeId  = null;
        vm.setType = setTypeFn;


        TypeModel.getList({groupname: 'payment_type'}).then(function (data) {
            vm.types = data.plain();
            if (vm.types.length) {
                vm.setType(vm.types[0]);
            }
        });


        function setTypeFn(type) {
            vm.typeId = type.type_id;
            CashSalePaymentService.setDefaultPaymentType(type);
            // ShoppingCartService.refresh();
            CashSaleDataService.refresh();
        }


    }

})();

