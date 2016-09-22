/**
 * Created by unal on 05.04.2016.
 */

(function () {
    var _name   = 'clientStats';
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
            bindToController: true
        }
    }

    Controller.$inject = ['CashSaleDataService'];
    function Controller(CashSaleDataService) {

        var vm   = this;
        vm.stats = CashSaleDataService.get('clientStats');

    }
})();