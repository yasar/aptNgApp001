/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPriceBuilder.service,{
    methods: {
        setPrimary: function (saleitemPriceId) {
            return this.model.one(saleitemPriceId).setPrimary();
        },

        openSaleitemPriceSelectForm: function (item, onItemSelect) {

            var $templateCache = this.$injector.get('$templateCache');
            var dialogs        = this.$injector.get('dialogs');
            var aptTempl       = this.$injector.get('aptTempl');

            $templateCache.put('app001/saleitemPrice/directives/setPrice/set-price.html',
                '<div data-apt-saleitem-price-set-price set-selected-price="priceSelected(data)" item="item" ></div>');
            dialogs.create('app001/saleitemPrice/directives/setPrice/set-price.html', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    $scope.item          = item;
                    $scope.priceSelected = function (price) {
                        onItemSelect(price);
                        $uibModalInstance.close();
                    }

                }], undefined, aptTempl.appConfig.defaults.dialogs.medium);
        }
    }


})