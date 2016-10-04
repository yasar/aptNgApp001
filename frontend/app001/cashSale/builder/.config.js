/**
 * Created by burak on 26.09.2016.
 */
var cashSaleBuilder = new aptBuilder({
    domain : 'cashSale',
    title  : 'Sale',
    package: 'app001',
    // dependencies: ['shoppingCart'],
    icon   : 'icon-cart2',
    menu   : {
        order: 2
    },
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        managerDirective : true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
    widgets: [
        {
            target : 'dashboard',
            /**
             * note that $scope is provided by the widget creator,
             * could from dashboard or somewhere else.
             *
             * so, it has nothing to do with this module!!
             *
             * @param $scope
             * @param $injector
             */
            creator: function ($scope, $injector) {
                var aptUtils         = $injector.get('aptUtils');
                var gettextCatalog   = $injector.get('gettextCatalog');
                var $filter          = $injector.get('$filter');
                var service          = $injector.get(cashSaleBuilder.getServiceName('service'));
                var graphValues      = [];
                $scope.onGraphCreate = onGraphCreate;
                $scope.params        = {
                    title           : gettextCatalog.getString('Sale'),
                    subTitle        : gettextCatalog.getString('Sale Manager'),
                    builder         : cashSaleBuilder,
                    headingMenuItems: [{
                        text : gettextCatalog.getString('Shopping Cart'),
                        icon : shoppingCartBuilder.icon,
                        click: function (item) {
                            aptUtils.goto({segment: 'main.app001.cashSale'});
                        }
                    }],
                    graph           : {
                        type   : 'discreteBarChart',
                        options: {
                            chart: {
                                type       : 'discreteBarChart',
                                height     : 150,
                                margin     : {
                                    top   : 10,
                                    right : 30,
                                    bottom: 50,
                                    left  : 65
                                },
                                x          : function (d) {
                                    return d.title;
                                },
                                y          : function (d) {
                                    return d.value;
                                },
                                showValues : true,
                                valueFormat: function (d) {
                                    return $filter('isoCurrency')(d, 'try');
                                },
                                duration   : 1000,
                                xAxis      : {
                                    axisLabel: gettextCatalog.getString('Weeks'),
                                },
                                yAxis      : {
                                    tickFormat: function (d) {
                                        return $filter('isoCurrency')(d, 'try');
                                    }
                                },
                            }
                        },
                        /**
                         * graphValues will be coming from service which means
                         * we have deal with promise.
                         * that's where we utilize the onGraphCreate function
                         * onGraphCreate will retrieve data from server and
                         * will assign the converted(!!) data into graphValues
                         */
                        data   : [{
                            "key"   : "Quantity",
                            "bar"   : true,
                            "values": graphValues
                        }]
                    }
                };
                this.serviceObj.addWidget({
                    template: '<apt-widget-builder ' +
                    'params="params"' +
                    'on-graph-create="onGraphCreate(graphApi)"></apt-widget-builder>',
                    _scopeId: $scope.$id
                });

                function onGraphCreate(graphApi) {
                    service.getWidgetDataForDashboard().then(function (data) {
                        aptUtils.emptyAndMerge(graphValues, data['weekly_totals']);
                        graphApi.refresh();

                        ///

                        $scope.params.title += ' (' + $filter('isoCurrency')(data['stats_totals']['day'], 'try') + ')';
                        $scope.params.description = $filter('isoCurrency')(data['stats_totals']['week'], 'try')
                            + ' / ' + $filter('isoCurrency')(data['stats_totals']['month'], 'try')
                            + ' / ' + $filter('isoCurrency')(data['stats_totals']['year'], 'try');
                        // + ' / ' + $filter('isoCurrency')(data['stats_totals']['overall'], 'try');
                    });
                }
            }
        }
    ],
    onRun  : function ($injector) {
        var hotkeys        = $injector.get('hotkeys');
        var $rootScope     = $injector.get('$rootScope');
        var gettextCatalog = $injector.get('gettextCatalog');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 's s s',
                description: gettextCatalog.getString('Cash Sale'),
                callback   : function () {
                    var aptUtils = $injector.get('aptUtils');
                    aptUtils.goto({segment: 'main.app001.cashSale'});
                }
            });
    },
    
    
    // list   : {
    //     controller: function ($injector, $scope, builder) {
    //
    //     }
    // },
    manager: {
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
    },
    
});

