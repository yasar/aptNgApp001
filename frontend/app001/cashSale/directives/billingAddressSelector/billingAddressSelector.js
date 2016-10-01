/**
 * Created by unal on 05.04.2016.
 */

(function () {
    var _name   = 'billingAddressSelector';
    var builder = cashSaleBuilder;


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
                addresses: '<'
            }
        }
    }

    Controller.$inject = ['CashSaleDataService', 'aptUtils'];
    function Controller(CashSaleDataService, aptUtils) {

        var vm                  = this;
        vm.selectBillingAddress = selectBillingAddressFn;
        var client              = CashSaleDataService.get('client');
        var invoiceRecipient    = CashSaleDataService.get('invoiceRecipient');


        function selectBillingAddressFn(billingAddress) {

            if (!_.isNull(client.person_id)) {
                invoiceRecipient.bill_to    = client.name;
                invoiceRecipient.tckn       = client.person.tckn;
                invoiceRecipient.tax_office = null;
                invoiceRecipient.tax_num    = null;
            }

            if (!_.isNull(client.entity_id)) {
                invoiceRecipient.bill_to    = client.name;
                invoiceRecipient.tax_office = client.entity.tax_office;
                invoiceRecipient.tax_num    = client.entity.tax_num;
                invoiceRecipient.tckn       = null;

            }

            invoiceRecipient.billing_address = aptUtils.formatAddressForPrint(billingAddress.address);
        }
    }
})();