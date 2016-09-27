/**
 * Created by burak on 26.09.2016.
 */
var clientBuilder = new aptBuilder({
    domain      : 'client',
    package     : 'app001',
    icon        : 'icon-chess-queen',
    title       : 'Client',
    menu        : true,
    create      : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        managerDirective : true,
        routeConfig      : true
    },
    onRun       : function ($injector) {
        var hotkeys        = $injector.get('hotkeys');
        var $rootScope     = $injector.get('$rootScope');
        var gettextCatalog = $injector.get('gettextCatalog');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 'ctrl+alt+c',
                description: gettextCatalog.getString('Client Manager'),
                callback   : function () {
                    var aptUtils = $injector.get('aptUtils');
                    aptUtils.goto({segment: 'main.app001.client'});
                }
            });
    },
    beforeAddNew: function ($injector, $scope, builder) {
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
    },
   

});

