/**
 * Created by murat on 24.12.2015.
 */


(function () {
    return;
    var builder = saleitemBuilder;
    angular
        .module(builder.getModuleName())
        .controller(builder.getControllerName('list'), fn);

    fn.$inject = ['$scope'];

    function fn($scope) {
        var vm = this;

        vm.addNewConf = {
            suffix: 'manager'
        };

        vm.editConf = {
            suffix: 'manager',
            popup : true,
            stay  : true
        };


    }
})();