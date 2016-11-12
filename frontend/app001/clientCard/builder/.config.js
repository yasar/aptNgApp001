/**
 * Created by burak on 26.09.2016.
 */
var clientCardBuilder = new aptBuilder({
    domain : 'clientCard',
    package: 'app001',
    icon   : 'icon-vcard',
    title  : 'Client Card',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        restsize            : function (item) {
            aptBuilder.utils.makeInt(item, ['is_primary']);

            if (_.has(item, 'setPassword') && !item.setPassword) {
                delete item.password;
            }
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    aptBuilder.utils.makeInt(item, ['client_card_id', 'client_id', 'card_id', 'enterprise_id']);
                    aptBuilder.utils.makeBool(item, ['is_primary']);
                    item._selectorTitle = item.card_no;
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    clientCardBuilder.model.restsize(item);
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                // {name: 'getInvoiceProfile', httpMethod: 'get', route: 'invoiceProfile'}
            ],
            collection: null
        }
    },
    service: {
        methods: {
            // getInvoiceProfile: function (clientId) {
            //     return this.model.one(clientId).getInvoiceProfile();
            // }
        }


    },
    form   : {
        title       : 'Client Card',
        beforeCreate: function ($injector, $scope, builder) {
            var vm  = this;
            vm.stay = true;
            vm.mute = false;
        },
        controller  : function ($injector, $scope, builder) {

            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');

            NotifyingService.subscribe($scope, 'clientCard.formDataLoaded', function () {
                vm.form.data.setPassword = false;
            });


            if (_.has(vm, 'params.client_id')) {
                vm.form.data.client_id = vm.params.client_id;
            }

        }
    },
    list   : {

        controller: function ($injector, $scope, builder) {

            var vm         = this,
                $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person',
                service    = $injector.get(builder.getServiceName('service')),
                model      = $injector.get(builder.getServiceName('model'));
            if (!vm.filter) {
                vm.filter = {};
            }

            loadFilter();

            var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
                loadFilter();
                vm.reload();
            });

            $scope.$on('$destroy', function () {
                listener();
            });


            function loadFilter() {
                var _filter     = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
                var _clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person';

                if (_filter) {
                    aptUtils.removeAndMerge(vm.filter, _filter);
                }

                if (_clientType) {
                    angular.merge(vm.filter, {
                        clientType: _clientType
                    });
                }
            }
        }
    },
});


