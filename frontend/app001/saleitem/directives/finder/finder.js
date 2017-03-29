/**
 * Created by unal on 31.03.2016.
 */

(function () {
    var _name   = 'finder';
    var builder = saleitemBuilder;
    
    
    angular.module(builder.getModuleName())
           .directive(builder.getDirectiveName(_name), Directive);
    
    function Directive() {
        return {
            restrict        : 'EA',
            scope           : {
                model   : '=?ngModel',
                onChange: '&?ngChange',
                onClick : '&?ngClick',
                /**
                 * can be `shopping_cart`, `purchase`
                 * default is `shopping_cart`
                 */
                for     : '@?'
                
            },
            bindToController: true,
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }
    
    Controller.$inject = ['$injector', '$scope'];
    
    function Controller($injector, $scope) {
        
        var vm               = this;
        var hotkeys          = $injector.get('hotkeys');
        var dialogs          = $injector.get('dialogs');
        var $templateCache   = $injector.get('$templateCache');
        var NotifyingService = $injector.get('NotifyingService');
        vm.browseSaleitem    = browseSaleitemFn;
        var saleitemFor      = vm.for || 'cashSale';
        
        
        vm.filter =
            {
                for: saleitemFor
            };
        hotkeys.bindTo($scope)
               .add({
                   combo      : 'ctrl+space',
                   description: 'Browse sale items',
                   callback   : browseSaleitemFn
               });
        
        
        function browseSaleitemFn() {
            var popupTpl = builder.getPath('cache') + '/popup.html';
            $templateCache.put(popupTpl, '<apt-cash-sale-browse-saleitem close-browse-saleitem-form="closeForm(data)"></apt-cash-sale-browse-saleitem>');
            dialogs.create(popupTpl, [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    
                    $scope.closeForm = function (result) {
                        
                        result ? $uibModalInstance.close() : null;
                    };
                    
                }
            ], undefined, {
                windowClass: 'slide-up'
            });
            
        }
        
    }
    
})();
