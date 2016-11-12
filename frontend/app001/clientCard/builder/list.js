/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientCardBuilder.list,{

    controller: function ($injector, $scope, builder) {

        var vm         = this,
            $rootScope = $injector.get('$rootScope'),
            aptUtils   = $injector.get('aptUtils'),
            clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person',
            service    = $injector.get(builder.getServiceName('service')),
            model      = $injector.get(builder.getServiceName('model'));
        if (!vm.filter) {
            vm.filter = {};
        }

        loadFilter();

        var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
            loadFilter();
            vm.reload();
        });

        $scope.$on('$destroy', function () {
            listener();
        });


        function loadFilter() {
            var _filter     = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
            var _clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person';

            if (_filter) {
                aptUtils.removeAndMerge(vm.filter, _filter);
            }

            if (_clientType) {
                angular.merge(vm.filter, {
                    clientType: _clientType
                });
            }
        }
    }
});
