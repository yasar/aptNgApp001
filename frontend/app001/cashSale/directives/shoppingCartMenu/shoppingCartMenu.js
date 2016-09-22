/**
 * Created by yasar on 04.06.2016.
 */

(function () {
    var _name   = 'shoppingCartMenu';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name)
        }
    }

    Controller.$inject = ['$injector'];
    function Controller($injector) {
        var vm                     = this;
        var CashSaleDataService    = $injector.get('CashSaleDataService');
        var NotifyingService       = $injector.get('NotifyingService');
        var CashSalePaymentService = $injector.get('CashSalePaymentService');
        var aptUtils               = $injector.get('aptUtils');
        var gettextCatalog         = $injector.get('gettextCatalog');
        var shoppingCartService    = $injector.get(shoppingCartBuilder.getServiceName('service'));
        var ClientService          = $injector.get(clientBuilder.getServiceName('service'));

        vm.flags                      = CashSaleDataService.getData().flags;
        vm.client                     = CashSaleDataService.getData().client;
        vm.resetShoppingCart          = resetShoppingCart;
        vm.openClientSaleHistoryPopup = openClientSaleHistoryPopupFn;

        function resetShoppingCart() {
            var title   = gettextCatalog.getString('Confirmation');
            var message = gettextCatalog.getString('You are about to reset the shopping cart. Resetting will clear the shopping list and selected client.') + ' ' + gettextCatalog.getString('Are you sure that you want to continue?');
            aptUtils.showConfirm(title, message, function () {
                NotifyingService.notify('shopping-cart:reset');
                CashSaleDataService.reset();
                CashSalePaymentService.reset();
            }, function () {
                shoppingCartService.vars.keepOnRouteChange = true;
            });
        }

        function openClientSaleHistoryPopupFn() {
            ClientService.openSaleHistory(vm.client);
        }
    }
})();