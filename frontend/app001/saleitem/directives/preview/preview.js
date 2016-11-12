/**
 * Created by unal on 27.06.2016.
 */

(function () {
    var _name   = 'preview';
    var builder = saleitemBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            bindToController: {
                saleitem: '='
            }
        }
    }

    Controller.$inject = ['$injector', '$scope'];

    function Controller($injector, $scope) {

        var vm = this;

    }
})();
