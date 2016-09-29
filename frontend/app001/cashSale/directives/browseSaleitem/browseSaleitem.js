/**
 * Created by unal on 31.03.2016.
 */


(function () {
    var _name   = 'browseSaleitem';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            controller      : Controller,
            bindToController: {
                closeBrowseSaleitemForm: '&'
            },
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['$injector', '$scope'];
    function Controller($injector, $scope) {

        var vm                  = this;
        var hotkeys             = $injector.get('hotkeys');
        var SaleitemService     = $injector.get('SaleitemService');
        var ShoppingCartService = $injector.get('ShoppingCartService');
        var aptUtils            = $injector.get('aptUtils');
        var gettextCatalog      = $injector.get('gettextCatalog');

        vm.groupId           = null;
        vm.brandId           = null;
        vm.saleitems         = [];
        vm.uniqId            = _.uniqueId();
        vm.searchFilter      = {name: undefined};
        vm.findSaleitem      = findSaleitemFn;
        vm.addToShoppingCart = addToShoppingCartFn;
        vm.cancel            = cancelFn;

        hotkeys.bindTo($scope)
            .add({
                combo      : 'ctrl+enter',
                description: 'Browse',
                callback   : findSaleitemFn
            });


        function findSaleitemFn() {
            if (SaleitemService.isBusy()) {
                return;
            }

            var filter   = {
                for     : 'shopping_cart',
                group_id: vm.groupId,
                brand_id: vm.brandId
            };
            vm.saleitems = SaleitemService.getRepo();
            SaleitemService.loadRepo(filter, false, {uniqId: vm.uniqId});
        }

        function addToShoppingCartFn(saleitem) {
            ShoppingCartService.addItem(saleitem);
        };

        function cancelFn() {
            var title   = gettextCatalog.getString('Confirmation');
            var message = gettextCatalog.getString('You are about to close the browse saleitem form. You will lose all changes.') + ' ' + gettextCatalog.getString('Are you sure that you want to continue?');
            aptUtils.showConfirm(title, message, function () {
                if (angular.isFunction(vm.closeBrowseSaleitemForm)) {
                    vm.closeBrowseSaleitemForm({data: true});
                }
            });
        }


    }

})();