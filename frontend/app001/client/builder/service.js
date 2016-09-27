/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientBuilder.service,{
    /*   edit   : {
     before: function ($injector, data, popup) {
     var restOp = $injector.get('restOperationService');
     restOp.edit({
     type  : clientBuilder.domain,
     suffix: 'manager',
     data  : data,
     popup : popup
     });

     /!**
     * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
     *!/
     return false;
     }
     },*/
    methods: {
        getInvoiceProfile        : function (item_id) {
            return this.model.one(item_id).getInvoiceProfile();
        },
        getSaleProfile           : function (item_id) {
            return this.model.one(item_id).getSaleProfile();
        },
        getOverviewProfile       : function (item_id) {
            return this.model.one(item_id).getOverviewProfile();
        },
        getByCardNr              : function (card_nr) {
            return this.model.getByCardNr(card_nr);
        },
        getWidgetDataForDashboard: function () {
            return this.model.getWidgetDataForDashboard();
        },
        addQuickClient           : function () {
            var params         = {
                formType: 'quick',
                stay    : false
            };
            var $templateCache = this.$injector.get('$templateCache');
            var dialogs        = this.$injector.get('dialogs');
            var aptTempl       = this.$injector.get('aptTempl');

            $templateCache.put('app001/client/directives/manager/manager.html',
                '<div data-apt-client-manager params="params" ></div>');
            dialogs.create('app001/client/directives/manager/manager.html', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    $scope.params = params;

                }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
        },

        openSaleHistory: function (client) {

            var $templateCache = this.$injector.get('$templateCache');
            var dialogs        = this.$injector.get('dialogs');
            var aptTempl       = this.$injector.get('aptTempl');

            $templateCache.put('app001/client/directives/saleHistory/saleHistory.html',
                '<div data-apt-client-sale-history item="client" ></div>');
            dialogs.create('app001/client/directives/saleHistory/saleHistory.html', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    $scope.client = client;

                }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
        },

        getSaleHistory: function (item_id) {
            return this.model.one(item_id).getSaleHistory();
        }
    }
});
