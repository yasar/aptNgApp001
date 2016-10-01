(function () {
    var _name   = 'profile';
    var builder = sellerBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'AE',
            bindToController: {
                itemId: '='
            },
            templateUrl     : function (elem, attrs) {
                var viewType = attrs.viewType ? '-' + attrs.viewType : '';
                return builder.getPath(_name) + '/' + _name + viewType + '.tpl.html';
            },
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
        };
    }

    Controller.$inject = ['$injector', '$scope'];
    function Controller($injector, $scope) {
        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));

        $scope.$watch(function () {
            return vm.itemId;
        }, function (newVal, oldVal) {

            if (_.isUndefined(newVal) || _.isEqual(newVal, oldVal)) {
                return;
            }
            loadProfile();
        });

        loadProfile();

        function loadProfile() {
            if (!vm.itemId) {
                return;
            }
            service.getOverviewProfile(vm.itemId).then(function (data) {
                $scope.data = data;
            });
        }

    }


})();