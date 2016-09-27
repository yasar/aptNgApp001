/**
 * Created by burak on 27.09.2016.
 */

_.merge(clientBuilder.widgets,[
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
            var service          = $injector.get(clientBuilder.getServiceName('service'));
            var graphValues      = [];
            $scope.onGraphCreate = onGraphCreate;
            $scope.params        = {
                title           : gettextCatalog.getString('Client'),
                subTitle        : gettextCatalog.getString('Client Manager'),
                description     : null,
                color           : null,
                builder         : clientBuilder,
                headingMenuItems: [/*{
                 text : gettextCatalog.getString('New Client'),
                 icon : clientBuilder.icon,
                 click: function (item) {
                 service.addNew();
                 }
                 }*/{
                    text : gettextCatalog.getString('Quick Client'),
                    icon : clientBuilder.icon,
                    click: service.addQuickClient
                }],
                /**
                 * this is a d3 graph configuration
                 */
                graph           : {
                    type   : 'discreteBarChart',
                    options: {
                        chart: {
                            type      : 'discreteBarChart',
                            height    : 150,
                            margin    : {
                                top   : 10,
                                right : 30,
                                bottom: 50,
                                left  : 65
                            },
                            x         : function (d) {
                                return d.title;
                            },
                            y         : function (d) {
                                return parseInt(d.value);
                            },
                            showValues: true,
                            duration  : 1000,
                            xAxis     : {
                                axisLabel: gettextCatalog.getString('Weeks'),
                            },
                            yAxis     : {},
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
                          'params="params" ' +
                          'on-graph-create="onGraphCreate(graphApi)"></apt-widget-builder>',
                _scopeId: $scope.$id
            });

            function onGraphCreate(graphApi) {
                service.getWidgetDataForDashboard().then(function (data) {
                    aptUtils.emptyAndMerge(graphValues, data['weekly_totals']);
                    graphApi.refresh();

                    ///

                    $scope.params.title += ' (' + data['stats_totals']['client_count'] + ')';
                    $scope.params.description = gettextCatalog.getString('Active', null, 'Client Status') + ': ' + data['stats_totals']['sale_count']
                                                + ', ' + gettextCatalog.getString('Passive', null, 'Client Status') + ': ' + data['stats_totals']['no_sale_count'];
                });
            }
        }
    }
]);