/**
 * Created by unal on 01.04.2016.
 */


(function () {
    var _name   = 'coupons';
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

        vm.coupons = CashSaleDataService.get('coupons');
        vm.flags   = CashSaleDataService.get('flags')
    }

})();