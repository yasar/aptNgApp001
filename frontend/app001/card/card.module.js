/**
 * Created by unal on 23.03.2016.
 */


var cardBuilder = new aptBuilder({
    domain : 'card',
    title  : 'Cards',
    package: 'app001',
    icon   : 'icon-credit-card',
    menu   : {
        target: 'enterprise'
    },
    disable:{
        addNew:true,
        edit:true
    },
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
    model  : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    item._selectorTitle = item.card_no;
                    cardBuilder.utils.makeInt(item, ['card_id', 'type_id']);
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: [
                {name: 'import', httpMethod: 'post', route: 'import'}

            ]
        }
    },
    service: {
        methods: {}


    },
    form   : {
        title: 'Card',

        controller: function ($injector, $scope, builder) {

            var vm         = this;
            var $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                service    = $injector.get(cardBuilder.getServiceName('service')),
                model      = $injector.get(cardBuilder.getServiceName('model'));

            vm.import = importFn;

            function importFn() {
                model.import(vm.form.data).then(function (data) {
                    if (data == 'false') {
                        aptUtils.showError('Error occurred', 'An unknown error occurred.');
                    }
                }, function (data) {

                });
            }


        }
    },
    list   : {

        controller: function ($injector, $scope, builder) {

            var vm         = this,
                $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                cardType   = aptUtils.getUrlSearchParamValue('cardType') || 'in_use',
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
                var _filter   = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
                var _cardType = aptUtils.getUrlSearchParamValue('cardType') || 'in_use';

                if (_filter) {
                    aptUtils.removeAndMerge(vm.filter, _filter);
                }

                if (_cardType) {
                    angular.merge(vm.filter, {
                        cardType: _cardType
                    });
                }
            }
        }
    },
});

cardBuilder.generate();

