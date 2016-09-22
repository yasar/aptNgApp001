/**
 * Created by unal on 27.06.2016.
 */


(function () {
    return;
    var _name   = 'findByBarcode__copy';
    var builder = saleitemBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

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
            var vm        = $scope[saleitemBuilder.getControllerAsName('findByBarcode')];
            var utils     = $injector.get('aptUtils');
            vm.onEnterKey = onEnterKeyFn;

            function onEnterKeyFn(keyEvent) {

                if (keyEvent.which === 13) {
                    element.find('input')[0].select();
                    vm.findSaleitem();
                    if (vm.secondEnter) {
                        utils.showWarning('Product Found', 'add shopping cart');
                    }
                }
            }
        }
    }

    Controller.$inject = ['$injector'];

    function Controller($injector) {

        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));
        var utils   = $injector.get('aptUtils');

        vm.barcode      = null;
        vm.lastBarcode  = null;
        vm.saleitem     = {};
        vm.secondEnter  = false;
        vm.findSaleitem = findSaleitem;


        function findSaleitem() {

            //if (vm.barcode != vm.lastBarcode) {
            //    vm.lastBarcode = vm.barcode;
            //
            //} else {
            //    vm.secondEnter = !vm.secondEnter;
            //    return;
            //}
            service.getByBarcode(vm.barcode).then(function (data) {
                if (data !== null && data !== 'null') {
                    angular.merge(vm.saleitem, data);
                } else {

                    utils.removeObjectProperties(vm.saleitem);
                    utils.showWarning('Product not Found', 'Add this Product or selected other product');
                }
            });
        }


    }
})();