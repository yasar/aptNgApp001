/**
 * Created by yasar on 03.06.2016.
 */

(function () {
    var _name   = 'payment';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            // templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            templateUrl : function (elem, attrs) {
                var viewType = attrs.viewType ? '-' + attrs.viewType : '';
                return builder.getPath(_name) + '/' + _name + viewType + '.tpl.html';
            },
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name)
        }
    }

    Controller.$inject = ['$injector'];
    function Controller($injector) {
        var vm                     = this;
        var CashSalePaymentService = $injector.get('CashSalePaymentService');
        var CashSaleDataService    = $injector.get('CashSaleDataService');
        vm.paymentServiceVars      = CashSalePaymentService.getVars();
        vm.saleItems               = CashSaleDataService.getData().saleItems;
    }
})();