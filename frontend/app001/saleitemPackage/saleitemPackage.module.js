/*
/!**
 * Created by unal on 19.03.2016.
 *!/


var saleitemPackageBuilder = new aptBuilder({
    domain : 'saleitemPackage',
    package: 'app001',
    icon   : 'icon-station',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        normalize           : function (item) {
            aptBuilder.utils.makeBool(item, ['is_partial']);
            aptBuilder.utils.makeInt(item, ['qty']);
            aptBuilder.utils.makeObject(item, ['type_conf']);
        },
        restize             : function (item) {
            aptBuilder.utils.makeInt(item, ['is_partial']);
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    saleitemPackageBuilder.model.normalize(item);
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    saleitemPackageBuilder.model.restize(item);
                }
            }
        ],
        methods            : {
            element   : [

                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: null
        }
    },
    service: {

        init: function ($injector) {
            this.repo = $injector.get(couponRequirementBuilder.getServiceName('service')).getRepo;
        },

        methods: {

            addPackageItem: function (item) {
                var _this = this;
                _this.repo.push(item);
            }
        }


    },
    form   : {
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var vm            = $scope[builder.getControllerAsName('form')];


        }
    },
    list   : {
        controller: function ($injector, $scope, builder) {
            var vm      = this;
            var service = $injector.get(builder.getServiceName('service'));

            vm.save   = saveFn;
            vm.delete = deleteFn;

            function saveFn(item) {
                service.update(item);
            }

            function deleteFn(item) {
                service.delete(item);
            }
        }
    },
    manager: {
        controller: function ($injector, $scope, builder) {
            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');
            var Restangular      = $injector.get('Restangular');
            var service          = $injector.get(builder.getServiceName('service'));
            var model            = $injector.get(builder.getServiceName('model'));

            vm.tableOptions = {
                showAddNewButton: false,
                addRowIndex     : false,
                addRowMenu      : false
            };

            NotifyingService.subscribe($scope, 'saleitemPackage:addItem', function (event, item) {
                addSaleitemPackageItem(item).then(function (data) {
                    angular.merge(item, data);
                    service.addPackageItem(item);
                });
                // $scope.$apply();
            });

            /!**
             * eklenen saleitem ilk once veri tabanına ekleniyor daha sonra listede gosteriliyor
             * liste ustunde update işlemi veya delete işlemi yapılacak
             *!/
            function addSaleitemPackageItem(item) {
                var packageItem = {
                    package_id : vm.itemId,
                    qty        : 1,
                    saleitem_id: item.saleitem_id
                };

                angular.merge(packageItem, model.one());
                return Restangular.copy(packageItem).post();
            };
        }
    }
});

saleitemPackageBuilder.generate();
*/
