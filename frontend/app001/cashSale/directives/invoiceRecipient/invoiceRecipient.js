/**
 * Created by unal on 05.04.2016.
 */


(function () {
    var _name   = 'invoiceRecipient';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['CashSaleDataService'];

    function Controller(CashSaleDataService) {

        var vm = this;

        vm.billingData       = {};
        vm.accept            = acceptFn;
        var invoiceRecipient = CashSaleDataService.get('invoiceRecipient');

        function acceptFn() {

            invoiceRecipient.billing_address = vm.billingData.address;
            invoiceRecipient.bill_to         = vm.billingData.bill_to;
            invoiceRecipient.tckn            = vm.billingData.tckn;
            invoiceRecipient.tax_office      = vm.billingData.tax_office;
            invoiceRecipient.tax_num         = vm.billingData.tax_num;
        }

    }

})();
