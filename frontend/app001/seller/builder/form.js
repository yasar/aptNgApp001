/**
 * Created by engin on 26.09.2016.
 */
_.merge(sellerBuilder.form,{
    controller: function ($injector, $scope, builder) {

        var vm         = this;
        var $rootScope = $injector.get('$rootScope'),
            aptUtils   = $injector.get('aptUtils'),
            service    = $injector.get(sellerBuilder.getServiceName('service')),
            model      = $injector.get(sellerBuilder.getServiceName('model'));
        var sellerType = service.vars.sellerType || aptUtils.getUrlSearchParamValue('sellerType') || 'person';

        vm.sellerFormType = vm.sellerFormType || sellerType;

        vm.selectQuickSellerFormType = selectQuickSellerFormType;
        vm.sellerQuickFormType       = null;
        function selectQuickSellerFormType(data) {
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
                    vm.sellerQuickFormType       = type;
                    vm.form.data.quickPersonData = {};
                    if (_.has(vm.form.data, 'quickEntityData')) {
                        delete vm.form.data.quickEntityData;
                    }
                    break;
                case 'entity':
                    vm.sellerQuickFormType       = type;
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
            var _sellerType   = service.vars.sellerType || aptUtils.getUrlSearchParamValue('sellerType') || 'person';
            vm.sellerFormType = _sellerType;
        }

    }
})