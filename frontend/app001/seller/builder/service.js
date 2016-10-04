/**
 * Created by engin on 26.09.2016.
 */
_.merge(sellerBuilder.service,{
    methods: {
        getOverviewProfile: function (item_id) {
            return this.model.one(item_id).getOverviewProfile();
        },
        addQuickSeller    : function () {

            var $templateCache = this.$injector.get('$templateCache');
            var dialogs        = this.$injector.get('dialogs');
            var aptTempl       = this.$injector.get('aptTempl');

            $templateCache.put('app001/seller/directives/form/form-quick.html',
                '<div data-apt-seller-form data-view-type="quick" data-stay="false"></div>');
            dialogs.create('app001/seller/directives/form/form-quick.html', [
                '$scope',
                '$uibModalInstance',
                'NotifyingService',
                function ($scope, $uibModalInstance, NotifyingService) {

                    NotifyingService.subscribe($scope, sellerBuilder.domain + ':added', function () {
                        $uibModalInstance.close();
                    });

                }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
        }

    }


})