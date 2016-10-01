/**
 * Created by yasar on 20.04.2015.
 */

(function () {
    var _name   = 'groupListing';
    var builder = clientBuilder;
    angular.module(builder.getModuleName()).directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'A',
            scope           : {},
            controller      : controllerFn,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            bindToController: {
                model   : '=ngModel',
                onchange: "&?",
                readonly: '@',
                checkbox: '@'
            },
            link            : linkFn
        };

        function linkFn($scope, elem, attrs) {
            var vm = $scope[builder.getControllerAsName(_name)];
            if (attrs.hasOwnProperty('checkbox') && attrs.checkbox == 'true') {
                vm.checkbox = true;
            }
        }
    }

    controllerFn.$inject = ['ClientGroupService'];

    function controllerFn(ClientGroupService) {

        var vm      = this;
        vm.checkbox = false;

        vm.data = ClientGroupService.getRepo();
        ClientGroupService.loadRepo();

        vm.setSelected = function (item) {
            vm.model = item.client_group_id;
        };

    }

})();



