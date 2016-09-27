/**
 * Created by burak on 26.09.2016.
 */
_.merge(cardBuilder.form,{
    title: 'Card',

    controller: function ($injector, $scope, builder) {

        var vm         = this;
        var $rootScope = $injector.get('$rootScope'),
            aptUtils   = $injector.get('aptUtils'),
            service    = $injector.get(cardBuilder.getServiceName('service')),
            model      = $injector.get(cardBuilder.getServiceName('model'));

        vm.import = importFn;

        function importFn() {
            model.import(vm.form.data).then(function (data) {
                if (data == 'false') {
                    aptUtils.showError('Error occurred', 'An unknown error occurred.');
                }
            }, function (data) {

            });
        }


    }
});

