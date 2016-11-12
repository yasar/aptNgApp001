/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientCardBuilder.form, {
    title       : 'Client Card',
    showHelp    : true,
    beforeCreate: function ($injector, $scope, builder) {
        var vm  = this;
        vm.stay = true;
        vm.mute = false;
    },
    controller  : function ($injector, $scope, builder) {

        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');

        NotifyingService.subscribe($scope, 'clientCard.formDataLoaded', function () {
            vm.form.data.setPassword = false;
        });


        if (_.has(vm, 'params.client_id')) {
            vm.form.data.client_id = vm.params.client_id;
        }

    }
});
