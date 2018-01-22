/**
 * Created by yasar on 01.10.2016.
 */

_.merge(cashSaleBuilder.widgets, [
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
                        aptUtils.goto({segment: 'main.app001.cashSale.list'});
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

                    if (data['stats_totals']) {
                        $scope.params.title += ' (' + $filter('isoCurrency')(data['stats_totals']['day'], 'try') + ')';
                        $scope.params.description = $filter('isoCurrency')(data['stats_totals']['week'], 'try')
                            + ' / ' + $filter('isoCurrency')(data['stats_totals']['month'], 'try')
                            + ' / ' + $filter('isoCurrency')(data['stats_totals']['year'], 'try');
                        // + ' / ' + $filter('isoCurrency')(data['stats_totals']['overall'], 'try');
                    }
                });
            }
        }
    }
]);