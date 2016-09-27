/**
 * Created by burak on 26.09.2016.
 */
_.merge(couponBuilder.service,{
    init: function ($injector) {
        // var PaymentService      = $injector.get('SalePaymentService'),
        //     ShoppingCartService = $injector.get('SaleShoppingCartService'),
        //     CashSaleDataService     = $injector.get('CashSaleDataService');

    },

    //edit: {
    //    before: function ($injector, data, popup) {
    //        var restOp = $injector.get('restOperationService');
    //        restOp.edit({
    //            type  : couponBuilder.domain,
    //            suffix: 'manager',
    //            data  : data,
    //            popup : popup
    //        });
    //
    //        /**
    //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
    //         */
    //        return false;
    //    }
    //},

    methods: {
        getOverview: function (couponId) {
            return this.model.one(couponId).getOverview();
        },

        inspect: function () {
            var PaymentService      = this.$injector.get('CashSalePaymentService');
            var CashSaleDataService = this.$injector.get('CashSaleDataService');
            // var ShoppingCartService = this.$injector.get('SaleShoppingCartService');
            var paymentData         = PaymentService.getVars();
            var saleData            = CashSaleDataService.getData();

            return this.model.inspect({
                default_payment_type_id: paymentData.default_payment_type.type_id,
                client_id              : saleData.client.client_id,
                payment_splits         : paymentData.splits,
                saleItems              : saleData.saleItems
            });
        },

        /**
         * gerekli açıklama line 198'e yapıldı
         */
        /*  checkValidity: function (coupon_id) {
         return this.model.one(coupon_id).checkValidity();
         },
         */
        showListing: function () {
            var dialogs        = this.$injector.get('dialogs');
            var $templateCache = this.$injector.get('$templateCache');

            $templateCache.put(couponBuilder.getPath('cache') + '/couponListPopup',
                '<apt-panel class="no-margin"><apt-panel-title><span translate>Coupons</span></apt-panel-title>' +
                '<apt-coupon-list></apt-coupon-list></apt-panel>');
            dialogs.create(couponBuilder.getPath('cache') + '/couponListPopup', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {

                    $uibModalInstance.close();

                }], undefined, {
                windowClass: 'slide-up'
            });
        }
    }


});
