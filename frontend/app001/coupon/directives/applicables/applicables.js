/**
 * Created by yasar on 30.05.2016.
 */

(function () {
    var _name   = 'applicables';
    var builder = couponBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            // templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            templateUrl     : function (elem, attrs) {
                var viewType = attrs.viewType ? '-' + attrs.viewType : '';
                return builder.getPath(_name) + '/' + _name + viewType + '.tpl.html';
            },
            scope           : true,
            bindToController: {
                selected_coupon: '=ngModel'
            }
        }
    }

    Controller.$inject = ['CashSaleDataService'];

    function Controller(CashSaleDataService) {
        var vm     = this;
        vm.coupons = CashSaleDataService.getData().coupons;
        vm.flags   = CashSaleDataService.get('flags')
    }

})();

