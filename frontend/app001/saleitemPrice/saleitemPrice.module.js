/*
/!**
 * Created by unal on 19.03.2016.
 *!/


var saleitemPriceBuilder = new aptBuilder({
    domain : 'saleitemPrice',
    package: 'app001',
    icon   : ' icon-cash4',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        normalize           : function (item) {
            aptBuilder.utils.makeBool(item, ['is_active', 'is_primary', 'is_price_inuse']);
            aptBuilder.utils.makeInt(item, ['price_type_id']);

            _.isObject(item.price) && priceBuilder.model.normalize(item.price);
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    saleitemPriceBuilder.model.normalize(item);
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    saleitemPriceBuilder.utils.makeInt(item, ['is_active', '__is_incomplete']);
                    if (_.has(item, 'price')) {
                        saleitemPriceBuilder.utils.makeInt(item.price, ['is_tax_included', 'tax']);
                    }
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                {name: 'setPrimary', httpMethod: 'put', route: 'setPrimary'}
            ],
            collection: null
        }
    },
    service: {
        methods: {
            setPrimary: function (saleitemPriceId) {
                return this.model.one(saleitemPriceId).setPrimary();
            },

            openSaleitemPriceSelectForm: function (item, onItemSelect) {

                var $templateCache = this.$injector.get('$templateCache');
                var dialogs        = this.$injector.get('dialogs');
                var aptTempl       = this.$injector.get('aptTempl');

                $templateCache.put('app001/saleitemPrice/directives/setPrice/set-price.html',
                    '<div data-apt-saleitem-price-set-price set-selected-price="priceSelected(data)" item="item" ></div>');
                dialogs.create('app001/saleitemPrice/directives/setPrice/set-price.html', [
                    '$scope',
                    '$uibModalInstance',
                    function ($scope, $uibModalInstance) {
                        $scope.item          = item;
                        $scope.priceSelected = function (price) {
                            onItemSelect(price);
                            $uibModalInstance.close();
                        }

                    }], undefined, aptTempl.appConfig.defaults.dialogs.medium);
            }
        }


    },
    form   : {
        title     : 'Price',
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var vm            = $scope[builder.getControllerAsName('form')];


        }
    },
    list   : {
        rowMenu: function ($injector, vm) {
            var Menu     = $injector.get('aptMenu');
            var restOp   = $injector.get('restOperationService');
            var service  = $injector.get(saleitemPriceBuilder.getServiceName('service'));
            var aptUtils = $injector.get('aptUtils');

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });

            var menuItemEdit = Menu.Item({
                text     : 'Edit',
                translate: true,
                icon     : 'icon-pencil',
                'class'  : 'dropdown-toggle btn-default',
                show     : function (item) {
                    return item.is_price_inuse == false;
                },
                click    : function (item) {
                    service.edit(item, {popup: true, stay: true, suffix: 'form'});
                }
            });

            var menuItemDelete = Menu.Item({
                text     : 'delete',
                icon     : 'icon-trash-alt',
                translate: true,
                'class'  : 'btn-danger',
                show     : function (item) {
                    return item.is_price_inuse == false;
                },
                click    : function (item) {
                    restOp.delete({type: 'saleitemPrice', data: item, allData: service.getRepo()});
                }
            });

            var menuItemSetPrimary = Menu.Item({
                text     : 'Set Primary',
                translate: true,
                icon     : 'icon-podium',
                'class'  : 'btn-danger',
                show     : function (item) {
                    if (item.price_type == 'purchase' || item.is_primary == true || item.is_active == false) {
                        return false;
                    } else {
                        return true;
                    }
                },
                click    : function (item) {
                    var waitConf = {
                        progress: 10
                    };
                    aptUtils.showWait(waitConf);
                    service.setPrimary(item.saleitem_price_id).then(function (data) {
                        if (data) {
                            waitConf.progress = 80;
                            service.loadRepo({saleitem_id: item.saleitem_id}, false, {
                                onLoaded: function () {
                                    waitConf.progress = 100;
                                }
                            });
                        } else {
                            waitConf.progress = 100;
                        }
                    });
                }
            });

            rowMenu.addChild(menuItemEdit);
            rowMenu.addChild(menuItemDelete);
            rowMenu.addChild(menuItemSetPrimary);
            return rowMenu;
        },

        controller: function ($injector, $scope, builder) {
            var vm      = this;
            var service = $injector.get(builder.getServiceName('service'));

            vm.addNew = function () {
                service.addNew({
                    popup      : true,
                    add_before : true,
                    confirm    : {
                        required: true
                    },
                    initialData: {
                        saleitem_id: _.get(vm, 'filter.saleitem_id')
                    }
                });
            };
        }
    },
});

saleitemPriceBuilder.generate();
*/
