/**
 * Created by unal on 31.03.2016.
 */
(function () {
    var _name   = 'shoppingCart';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            scope           : {
                items: '='
            },
            bindToController: true,
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['$scope', '$injector'];

    function Controller($scope, $injector) {

        var vm               = this;
        var dialogs          = $injector.get('dialogs');
        var $templateCache   = $injector.get('$templateCache');
        var CashSaleDataService  = $injector.get('CashSaleDataService');
        var saleData         = CashSaleDataService.getData();
        var NotifyingService = $injector.get('NotifyingService');
        var $timeout         = $injector.get('$timeout');
        vm.refresh           = CashSaleDataService.refresh;
        vm.isResetting       = false;

        var listener1 = $scope.$watch(function () {
            return saleData.saleItems;
        }, function (newVal, oldVal) {

            if (!newVal && _.isEqual(newVal, oldVal)) {
                return;
            }

            CashSaleDataService.refresh();
        }, true);

        NotifyingService.subscribe($scope, 'shopping-cart:reset', function () {
            vm.isResetting = true;
            $timeout(function () {
                vm.isResetting = false;
                vm.items       = CashSaleDataService.getData().saleItems;
            }, 300);
        });

        $scope.$on('$destroy', function(){
            listener1();
        });

    }

})();
