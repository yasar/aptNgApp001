/**
 * Created by unal on 18.08.2015.
 */

(function () {
    var _name   = 'paymentOptions';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);


    function Directive() {
        return {
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name)
        };
    }

    Controller.$inject = ['$scope', '$injector'];
    function Controller($scope, $injector) {

        var vm                     = this;
        var CashSalePaymentService = $injector.get('CashSalePaymentService');
        var ShoppingCartService    = $injector.get('ShoppingCartService');
        var CashSaleDataService    = $injector.get('CashSaleDataService');

        // vm.paymentTypes = CashSalePaymentService.getPaymentTypes(function () {
        //     vm.selectedPaymentType = _.find(vm.paymentTypes, {name: 'cash'});
        // });
        //
        // vm.setPaymentType = function (paymentType) {
        //     vm.selectedPaymentType = paymentType;
        // };


        vm.splits = CashSalePaymentService.getVars().splits;


        vm.removeSplit = function (index) {
            CashSalePaymentService.removeSplit(index);
            CashSaleDataService.refresh().then(function () {
            // ShoppingCartService.refresh().then(function () {
            //     CashSalePaymentService.refreshSplit();
            });
        };

        vm.tableOptions = {
            showHeader: false,
            addRowMenu: false
        };
    }

})();


