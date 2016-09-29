/**
 * Created by yasar on 04.08.2016.
 */


(function () {
    var _name   = 'toolbar';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            scope           : true,
            replace         : true,
            bindToController: {},
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }


    Controller.$inject = ['$injector'];
    function Controller($injector) {

        var vm                  = this;
        var CashSaleDataService = $injector.get('CashSaleDataService');
        vm.saleData             = CashSaleDataService.getData();

    }

})();
