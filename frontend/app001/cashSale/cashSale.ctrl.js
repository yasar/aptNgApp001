/**
 * Created by unal on 30.03.2016.
 */

(function () {
    return;
    angular.module('apt.app001.cashSale').controller('CashSaleCtrl', fn);

    fn.$inject = ['aptTempl', 'aptMenu', '$routeSegment',
        '$scope', 'gettextCatalog', 'aptUtils', '$rootScope'];

    function fn(Templ, Menu, $routeSegment, $scope, gettextCatalog, aptUtils, $rootScope) {
        var builder = cashSaleBuilder;
        Templ.reset(true);

        Templ.config.transparentHeader = true;
        Templ.config.showHeader        = true;
        Templ.config.showBreadcrumb    = true;
        Templ.config.showFooter        = true;
        Templ.config.showSidebarLeft   = true;
        Templ.config.showSidebarRight  = false;
        Templ.config.fillContent       = true;

        Templ.page.title = gettextCatalog.getString(builder.title);
        Templ.page.icon  = builder.icon;


        // LEFT
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

    function fnOld(Templ, Menu, $routeSegment, $scope, gettextCatalog, aptUtils, $rootScope) {

        Templ.reset();

        Templ.config.transparentHeader = true;
        Templ.config.showHeader        = true;
        Templ.config.showBreadcrumb    = true;
        Templ.config.showFooter        = true;
        Templ.config.showSidebarLeft   = true;
        Templ.config.showSidebarRight  = true;
        Templ.config.fillContent       = true;

        Templ.page.title = 'Sale Manager';
        Templ.page.icon  = cashSaleBuilder.icon;


        // LEFT

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

        // RIGHT
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
})();