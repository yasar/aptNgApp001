/**
 * Created by burak on 27.09.2016.
 */

_.merge(clientBuilder.manager, {
    controller: function ($injector, $scope, builder) {
        var vm = this;

        vm.formType = _.has(vm.params, 'formType') ? vm.params.formType : 'nested'
        vm.stay     = _.has(vm.params, 'stay') ? vm.params.stay : 'true'

    }
});