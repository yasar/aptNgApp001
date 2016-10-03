/**
 * Created by yasar on 01.10.2016.
 */
_.merge(cashSaleBuilder.manager, {
    controller: function ($injector, $scope, builder) {
        var vm                  = this;
        var CashSaleDataService = $injector.get('CashSaleDataService');
        var PaymentService      = $injector.get('CashSalePaymentService');
        // var ShoppingCartService = $injector.get('ShoppingCartService');
        var ShoppingCartService = $injector.get('ShoppingCartService');
        var NotifyingService    = $injector.get('NotifyingService');
        var $routeSegment       = $injector.get('$routeSegment');
        var aptUtils            = $injector.get('aptUtils');
        vm.saleData             = CashSaleDataService.getData();

        /**
         * barcode ile okutulan ürünün ilk dinleme yeri
         */
        NotifyingService.subscribe($scope, 'product-barcode-read', function (event, saleitem) {
            ShoppingCartService.addItem(saleitem);
            event.preventDefault();
        }, false, true);


        var listener = $scope.$on('$routeChangeStart', function (event, next, current) {
            if (current.$$route.segment != 'main.app001.cashSale') {
                return;
            }

            resetAllSaleManagerData(next.$$route.originalPath);
            event.preventDefault();

            listener();
        });


        $scope.$on('$destroy', function () {
            listener();
        });


        function resetAllSaleManagerData(url) {

            var gettextCatalog = $injector.get('gettextCatalog');

            if (!_.isEmpty(vm.saleData.client)
                || !_.isEmpty(vm.saleData.clientStats)
                || !_.isEmpty(vm.saleData.saleitems)
                   && url !== '/sale') {
                aptUtils.showConfirm(
                    gettextCatalog.getString('Confirmation'),
                    gettextCatalog.getString('You will loose any unsaved data if you choose to continue.' + ' ' + gettextCatalog.getString('Are you sure that you want to continue?')), function () {
                        /**
                         * paymentservice.reset balance yani alışveriş tutarından kalan miktarı da sıfırladıgı için
                         * sale sayfasından ileri geri yaptıgımızda alısverişi tamamlamadıgımız hiç bir odeme yapmadıgımız
                         * durumda kalan odemeyi 0 olarak gosteriyor bundan dolayı reser() yerin resetSplits() funk. cagırıyoruz.
                         * boylece sayfa degiştirme durumunda eger splitlerimizi saklamak istiyorsan saklıyabilyoruz eger
                         * istemiyorsak splits sıfırlanıyor.
                         */
                        PaymentService.resetSplits();
                        CashSaleDataService.reset();
                        gotoNextUrl();
                    });

            }

            function gotoNextUrl() {
                aptUtils.goto({url: url});
            }
        }


    }
});