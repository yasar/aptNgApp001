/**
 * Created by yasar on 13.07.2016.
 */


(function () {
    var _name   = 'finder';
    var builder = tillBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    Directive.$inject = ['$injector'];

    function Directive($injector) {
        return {
            restrict        : 'EA',
            scope           : {
                till_id: '=ngModel'
            },
            bindToController: true,
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            link            : Link
        };

        function Link($scope, element, attr) {
            // var vm               = $scope[saleitemBuilder.getControllerAsName('finder')];
            // var NotifyingService = $injector.get('NotifyingService');
            // var $timeout         = $injector.get('$timeout');

        }
    }

    Controller.$inject = ['$injector'];

    function Controller($injector) {

        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));
        var utils   = $injector.get('aptUtils');


    }
})();