/**
 * Created by burak on 26.09.2016.
 */
_.merge(cashSaleBuilder.layout,{
    templConfig: {
        showSidebarRight: false
    },
    controller : function ($injector, $scope, builder) {

        var Templ               = $injector.get('aptTempl');
        var gettextCatalog      = $injector.get('gettextCatalog');
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var service             = $injector.get(shoppingCartBuilder.getServiceName('service'));


        if (Templ.config.showSidebarLeft) {

            Templ.setSlotItem('sidebarLeft', 'menu', {
                isCollapsable: true,
                isCollapsed  : true,
                showTitle    : true,
                title        : gettextCatalog.getString('Menu'),
                body         : '<div apt-cash-sale-shopping-cart-menu></div>',
                // class        : 'bg-slate-300',
                _scopeId     : $scope.$id
            });

            Templ.setSlotItem('sidebarLeft', 'client', {
                isCollapsable: true,
                isCollapsed  : false,
                showTitle    : true,
                title        : gettextCatalog.getString('Client'),
                // body         : '<div apt-cash-sale-client-finder class="p-10"></div>',
                body         : '<div apt-cash-sale-client></div>',
                // class        : 'bg-slate-300',
                _scopeId     : $scope.$id
            });

            Templ.setSlotItem('sidebarLeft', 'product', {
                title   : gettextCatalog.getString('Sale Item'),
                body    : '<apt-cash-sale-saleitem-finder></apt-cash-sale-saleitem-finder>',
                _scopeId: $scope.$id
            });
        }


        // RIGHT
        if (Templ.config.showSidebarRight) {

            Templ.setSlotItem('sidebarRight', 'coupons', {
                title   : gettextCatalog.getString('Coupons'),
                // body    : '<apt-cash-sale-coupons></apt-cash-sale-coupons>',
                body    : '<apt-coupon-applicables></apt-coupon-applicables>',
                _scopeId: $scope.$id
            });

            Templ.setSlotItem('sidebarRight', 'payment', {
                isCollapsable: false,
                isCollapsed  : false,
                showTitle    : true,
                title        : gettextCatalog.getString('Payment'),
                body         : '<apt-cash-sale-payment></apt-cash-sale-payment>',
                _scopeId     : $scope.$id
            });
        }
    }
});
