/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientBuilder.list, {
    rowMenu       : function ($injector, vm) {

        var Menu           = $injector.get('aptMenu');
        var ClientService  = $injector.get('ClientService');
        var $templateCache = $injector.get('$templateCache');
        var dialogs        = $injector.get('dialogs');

        var rowMenu = Menu.Item({
            name   : 'row-menu',
            'class': 'btn-group-xs'
        });


        var menuItemEdit    = Menu.Item('edit',{
            click    : function (item) {
                if (!_.isNull(item.entity_id)) {
                    ClientService.vars.clientType = 'entity';
                }
                else if (!_.isNull(item.person_id)) {
                    ClientService.vars.clientType = 'person';
                }

                ClientService.edit(item, {popup: true, stay: true, suffix: 'manager'});
            }
        });
        var menuItemDelete  = Menu.Item('delete',{
            click  : function (item) {
                ClientService.delete(item);
            }
        });
        var menuItemCurrent = Menu.Item({
            text : currentBuilder.title,
            icon : currentBuilder.icon,
            click: function (item) {
                var currentService = $injector.get(currentBuilder.getServiceName('Service'));

                var filter = {
                    id  : item.client_id,
                    type: 'client'
                };

                currentService.showCurrentPopup(filter);
            }
        });

        rowMenu.addChild(menuItemEdit);
        rowMenu.addChild(menuItemDelete);
        rowMenu.addChild(menuItemCurrent);

        return rowMenu;
    },
    controller    : function ($injector, $scope, builder) {

        var vm         = this;
        var $rootScope = $injector.get('$rootScope');
        var aptUtils   = $injector.get('aptUtils');
        var $timeout   = $injector.get('$timeout');
        var service    = $injector.get(builder.getServiceName('service'));
        var model      = $injector.get(builder.getServiceName('model'));
        var clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';


        if (!vm.filter) {
            vm.filter = {};
        }

        loadFilter();

        var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
            $timeout(function () {
                loadFilter();
                vm.reload();
            });
        });

        $scope.$on('$destroy', function () {
            listener();
        });


        function loadFilter() {
            var _filter     = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
            // var _clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
            var _clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person';

            if (_filter) {
                aptUtils.removeAndMerge(vm.filter, _filter);
            }

            if (_clientType) {
                angular.merge(vm.filter, {
                    clientType: _clientType
                });
            }

            if (_.has(vm.params, 'clientType')) {
                if (vm.params.clientType == 'allClient') {
                    aptUtils.nullifyObjectProperties(vm.filter);
                }
            }
        }
    },
    onBeforeAddNew: function ($injector, $scope, builder) {
        var dialogs        = $injector.get('dialogs');
        var $templateCache = $injector.get('$templateCache');
        var $q             = $injector.get('$q');
        var $timeout       = $injector.get('$timeout');
        var aptTempl       = $injector.get('aptTempl');
        var service        = $injector.get(builder.getServiceName('service'));
        var defer          = $q.defer();
        var vm             = this;

        $timeout(function () {
            $templateCache.put(clientBuilder.getPath('cache') + '/clientTypeSelectorPopup',
                // '<apt-panel class="no-margin"><apt-panel-title><span translate>Select Type</span></apt-panel-title>' +
                '<apt-client-type-selector on-completed="onCompleted(data)"></apt-client-type-selector>' +
                // '</apt-panel>' +
                '');
            dialogs.create(clientBuilder.getPath('cache') + '/clientTypeSelectorPopup', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    // $uibModalInstance.close();
                    // $scope.data        = {type: null};
                    $scope.onCompleted = function (data) {

                        service.vars.clientType = data.type;
                        $uibModalInstance.close();
                        defer.resolve();
                    };

                }], undefined, aptTempl.appConfig.defaults.dialogs.confirm);
        });
        return defer.promise;
    }
});