(function () {
    var _name   = 'typeSelector';
    var builder = sellerBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'AE',
            bindToController: {
                // type       : '=',
                onCompleted: '&'
            },
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
        };
    }

    Controller.$inject = ['$injector', '$scope'];
    function Controller($injector, $scope) {
        var vm           = this;
        var selectedType = 'person';
        vm.selectType    = function (type) {
            selectedType = type;
            vm.complete();
        };
        vm.complete      = function () {
            // vm.type = selectedType;
            vm.onCompleted({data: {type: selectedType}});
        };

    }


})();