/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientBuilder.form,{
    suffix    : 'form',
    controller: function ($injector, $scope, builder) {

        var vm         = this;
        var $rootScope = $injector.get('$rootScope');
        var aptUtils   = $injector.get('aptUtils');
        var service    = $injector.get(clientBuilder.getServiceName('service'));
        var model      = $injector.get(clientBuilder.getServiceName('model'));
        var clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';

        vm.clientSelected = clientSelectedFn;
        vm.selectedId     = null;
        vm.clientFormType = vm.clientFormType || clientType;

        vm.selectQuickClientFormType = selectQuickClientFormTypeFn;
        vm.clientQuickFormType       = null;
        function selectQuickClientFormTypeFn(data) {
            var type = data.name;

            if (!_.has(vm.form.data, 'quickAddressData')) {
                vm.form.data.quickAddressData = {};
            } else {
                aptUtils.nullifyObjectProperties(vm.form.data.quickAddressData);
            }

            if (!_.has(vm.form.data, 'quickContactData')) {
                vm.form.data.quickContactData = {};
            } else {
                aptUtils.nullifyObjectProperties(vm.form.data.quickContactData);
            }

            switch (type) {
                case 'person':
                    vm.clientQuickFormType       = type;
                    vm.form.data.quickPersonData = {};
                    if (_.has(vm.form.data, 'quickEntityData')) {
                        delete vm.form.data.quickEntityData;
                    }
                    break;
                case 'entity':
                    vm.clientQuickFormType       = type;
                    vm.form.data.quickEntityData = {
                        business_name: null
                    };
                    if (_.has(vm.form.data, 'quickPersonData')) {
                        delete vm.form.data.quickPersonData;
                    }
                    break;
            }

        }

        loadFilter();

        var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
            loadFilter();
        });

        $scope.$on('$destroy', function () {
            listener();
        });


        function loadFilter() {
            var _clientType   = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
            vm.clientFormType = _clientType;
        };

        function clientSelectedFn() {
            if (clientType == 'person') {
                vm.selectedId = vm.form.data.person_id;
            }
            if (clientType == 'entity') {
                vm.selectedId = vm.form.data.entity_id;
            }
        }

    }
});
