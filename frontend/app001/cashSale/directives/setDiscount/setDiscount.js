/**
 * Created by unal on 02.04.2016.
 */


(function () {
    var _name   = 'setDiscount';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            scope           : true,
            bindToController: {
                saleitem          : '=',
                discountAccepted  : '&',
                closeDiscountForm: '&'
            },
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }


    Controller.$inject = ['CashSaleDiscountService', 'aptUtils','gettextCatalog'];

    function Controller(CashSaleDiscountService, aptUtils,gettextCatalog) {

        var vm = this;

        CashSaleDiscountService.resetNewPrice();
        vm.discountType          = null;
        vm.value                 = null;
        vm.discountIsTaxIncluded = null;
        vm.onTotal               = null;
        vm.newPrice              = CashSaleDiscountService.getNewPrice();
        vm.apply                 = applyFn;
        vm.accept                = acceptFn;
        vm.cancel                = cancelFn;


        function applyFn() {
            CashSaleDiscountService.calculateNewPrice(vm.discountType, vm.value, vm.saleitem, vm.discountIsTaxIncluded, vm.onTotal);
        };

        function acceptFn() {

            if (angular.isFunction(vm.discountAccepted)) {
                vm.discountAccepted({data: vm.newPrice});
            }
        };

        function cancelFn() {
            var title   = gettextCatalog.getString('Confirmation');
            var message = gettextCatalog.getString('You are about to close the discount form. You will lose all changes.') + ' ' + gettextCatalog.getString('Are you sure that you want to continue?');
            aptUtils.showConfirm(title, message, function () {
                if (angular.isFunction(vm.closeDiscountForm)) {
                    vm.closeDiscountForm({data: true});
                }
                // you are about to close the dscount form
                // Are you sure that you want to close the form
                // You wanted to close the form
            });
        }


    }

})();
