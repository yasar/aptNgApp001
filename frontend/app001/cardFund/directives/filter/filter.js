(function () {
    var _name   = 'filter';
    var builder = cardFundBuilder;

    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
        }
    }

    Controller.$inject = ['$scope', '$injector'];
    function Controller($scope, $injector) {

        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');
        vm.applyFilter       = applyFilter;
        vm.resetFilter       = resetFilter;
        vm.filter            = null;

        function applyFilter() {
            NotifyingService.notify('card-fund-filter:set', vm.filter);
        }

        function resetFilter() {
            vm.filter = null;
        }
    }

})();
