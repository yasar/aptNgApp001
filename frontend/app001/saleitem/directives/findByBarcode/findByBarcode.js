/**
 * Created by unal on 27.06.2016.
 */


(function () {
    var _name   = 'findByBarcode';
    var builder = saleitemBuilder;


    angular.module(builder.getModuleName()).directive(builder.getDirectiveName(_name), Directive);

    Directive.$inject = ['$injector'];

    function Directive($injector) {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            link        : Link
        };

        function Link($scope, element, attr) {
            var vm               = $scope[saleitemBuilder.getControllerAsName('findByBarcode')];
            var NotifyingService = $injector.get('NotifyingService');
            var $timeout         = $injector.get('$timeout');
            vm.onEnterKey        = onEnterKeyFn;

            $timeout(function () {
                element.find('input')[0].focus();
            });

            function onEnterKeyFn(keyEvent) {

                if (keyEvent.which === 13) {
                    element.find('input')[0].select();
                    if (vm.lastBarcode == vm.barcode) {
                        vm.secondEnter = true;
                    } else {
                        vm.secondEnter = false;
                    }
                    if (!vm.secondEnter) {
                        vm.findSaleitem();
                    } else {
                        // NotifyingService.notify('product-barcode-read', vm.saleitem);
                        NotifyingService.notify('product-barcode-read', {
                            saleitem: vm.saleitem,
                            options : {closePopup: false}
                        });

                        vm.reset();
                    }
                }
            }
        }
    }

    Controller.$inject = ['$injector'];

    function Controller($injector) {

        var vm                  = this;
        var service             = $injector.get(builder.getServiceName('service'));
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var utils               = $injector.get('aptUtils');

        vm.barcode         = null;
        vm.lastBarcode     = null;
        vm.secondEnter     = false;
        vm.saleitem        = {};
        vm.productOverview = null;
        vm.findSaleitem    = findSaleitem;
        vm.reset           = reset;

        vm.saleData = CashSaleDataService.getData();

        function findSaleitem() {

            service.getByBarcode(vm.barcode).then(function (data) {
                if (data !== null && data !== 'null') {
                    angular.merge(vm.saleitem, data);
                    vm.lastBarcode     = vm.barcode;
                    vm.productOverview = true;
                } else {

                    utils.removeObjectProperties(vm.saleitem);
                    vm.productOverview = false;
                }
            });
        }

        function reset() {
            // utils.removeObjectProperties(vm.saleitem);
            vm.saleitem        = {};
            vm.productOverview = false;
            vm.barcode         = null;
            vm.lastBarcode     = null;
            vm.secondEnter     = false;
        }


    }
})();