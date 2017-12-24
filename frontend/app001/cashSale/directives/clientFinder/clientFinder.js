/**
 * Created by unal on 01.04.2016.
 */


(function () {
    var _name   = 'clientFinder';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName()).directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            compile     : Compile
        }
    }

    function Compile(element, attrs) {
        element.removeAttr('apt-client-finder');
        element.removeAttr('data-apt-client-finder');
        delete attrs.aptClientFinder;
    }

    Controller.$inject = ['$scope', '$injector'];

    function Controller($scope, $injector) {

        var vm                  = this;
        // var ShoppingCartService = $injector.get('ShoppingCartService');
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var ClientService       = $injector.get('ClientService');
        var aptUtils            = $injector.get('aptUtils');
        var NotifyingService    = $injector.get('NotifyingService');
        var invoiceRecipient    = CashSaleDataService.get('invoiceRecipient');
        vm.selectClient         = selectClientFn;
        vm.clientId             = null;

        NotifyingService.subscribe($scope, 'shopping-cart:reset', function () {
            vm.clientId = null;
        });


        function selectClientFn(data) {
            if (!data) {
                return;
            }

            CashSaleDataService.set('flags.isClientSelected', true);
            ClientService.getSaleProfile(data.client_id).then(function (data) {
                CashSaleDataService.refresh();
                setInvoiceProfile(data.invoice);
                setClientStats(data.stats);
            });


            function setInvoiceProfile(invoiceProfile) {

                var bill_to = invoiceProfile.name;

                //
                aptUtils.emptyArray(invoiceRecipient.addresses);
                //

                if (_.has(invoiceProfile, 'person') && _.isObject(invoiceProfile.person)) {
                    invoiceRecipient.tckn = invoiceProfile.person.tckn;
                    if (invoiceProfile.person.addresses && invoiceProfile.person.addresses.length) {
                        setInvoiceProfileAddresses(invoiceProfile.person.addresses);
                    }

                }
                else if (_.has(invoiceProfile, 'entity') && _.isObject(invoiceProfile.entity)) {
                    invoiceRecipient.tax_office = invoiceProfile.entity.tax_office;
                    invoiceRecipient.tax_num    = invoiceProfile.entity.tax_nr;
                    if (invoiceProfile.entity.addresses && invoiceProfile.entity.addresses.length) {
                        setInvoiceProfileAddresses(invoiceProfile.entity.addresses);
                    }

                }

                invoiceRecipient.bill_to = bill_to;


                function setInvoiceProfileAddresses(addresses) {
                    var billing_address              = aptUtils.formatAddressForPrint(addresses[0].address);
                    invoiceRecipient.billing_address = billing_address;
                    invoiceRecipient.addresses       = addresses;
                }

                CashSaleDataService.set('client', invoiceProfile);
            }


            function setClientStats(stats) {
                CashSaleDataService.set('clientStats', stats);
            }
        }
    }

})();
