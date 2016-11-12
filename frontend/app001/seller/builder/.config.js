/**
 * Created by engin on 26.09.2016.
 */

var sellerBuilder = new aptBuilder({
    domain      : 'seller',
    package     : 'app001',
    icon        : 'icon-truck',
    title       : 'Supplier',
    menu        : true,
    create      : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : true
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
            $templateCache.put(sellerBuilder.getPath('cache') + '/sellerTypeSelectorPopup',
                // '<apt-panel class="no-margin"><apt-panel-title><span translate>Select Type</span></apt-panel-title>' +
                '<apt-seller-type-selector on-completed="onCompleted(data)"></apt-seller-type-selector>' +
                // '</apt-panel>' +
                '');
            dialogs.create(sellerBuilder.getPath('cache') + '/sellerTypeSelectorPopup', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    // $uibModalInstance.close();
                    // $scope.data        = {type: null};
                    $scope.onCompleted = function (data) {

                        service.vars.sellerType = data.type;
                        $uibModalInstance.close();
                        defer.resolve();
                    };

                }], undefined, aptTempl.appConfig.defaults.dialogs.confirm);
        });
        return defer.promise;
    },
});


