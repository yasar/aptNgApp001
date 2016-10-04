/**
 * Created by unal on 31.03.2016.
 */

(function () {
    var _name   = 'saleitemFinder';
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

    Controller.$inject = ['$injector', '$scope'];

    function Controller($injector, $scope) {

        var vm                  = this;
        var hotkeys             = $injector.get('hotkeys');
        var ShoppingCartService = $injector.get(shoppingCartBuilder.getServiceName('service'));
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var dialogs             = $injector.get('dialogs');
        var $templateCache      = $injector.get('$templateCache');
        var NotifyingService    = $injector.get('NotifyingService');

        vm.flags          = CashSaleDataService.getData().flags;
        vm.saleitemId     = null;
        vm.selectSaleitem = selectSaleitemFn;

        NotifyingService.subscribe($scope, 'shopping-cart:reset', function () {
            /**
             * if, in earlier sale, the shopping cart was filled with some saleitems,
             * then the last selectedItem is kept as it was assined to ng-model.
             * and this caused that when we reset the shopping cart, the last item added gets re-added into suppose-tobe-clean list.
             * @type {null}
             */
            vm.saleitemId = null;
        });


        function selectSaleitemFn(data) {
            ShoppingCartService.addItem(data);
        }

    }

})();
