/**
 * Created by burak on 26.09.2016.
 */
_.merge(cardBuilder.list,{

    controller: function ($injector, $scope, builder) {

        var vm         = this,
            $rootScope = $injector.get('$rootScope'),
            aptUtils   = $injector.get('aptUtils'),
            cardType   = aptUtils.getUrlSearchParamValue('cardType') || 'in_use',
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
            var _filter   = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
            var _cardType = aptUtils.getUrlSearchParamValue('cardType') || 'in_use';

            if (_filter) {
                aptUtils.removeAndMerge(vm.filter, _filter);
            }

            if (_cardType) {
                angular.merge(vm.filter, {
                    cardType: _cardType
                });
            }
        }
    }
});
