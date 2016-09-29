/*
/!**
 * Created by unal on 19.03.2016.
 *!/


var saleitemBuilder = new aptBuilder({
    domain : 'saleitem',
    package: 'app001',
    icon   : 'icon-basket',
    title  : 'Product',
    menu   : {
        target: 'enterprise'
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
    //onRun  : function ($injector) {
    //    var hotkeys    = $injector.get('hotkeys');
    //    var $rootScope = $injector.get('$rootScope');
    //    hotkeys.bindTo($rootScope)
    //        .add({
    //            combo      : 'ctrl ctrl s',
    //            description: 'Product Finder',
    //            callback   : function () {
    //                window.alert('open');
    //            }
    //        });
    //},
    model  : {
        normalize           : function (item) {

            aptBuilder.utils.makeNumber(item, ['base_price', 'tax', 'price', 'taxed_price', 'stock']);
            aptBuilder.utils.makeInt(item, ['saleitem_id', 'enterprise_id', 'type_id',
                'brand_id', 'model_id', 'group_id', 'unit_id', 'count']);
            aptBuilder.utils.makeBool(item, ['is_stock_enabled', '__is_incomplete']);
            aptBuilder.utils.makeObject(item, ['type_conf']);
        },
        restize             : function (item, $injector) {
            aptBuilder.utils.makeInt(item, ['is_stock_enabled']);
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {

                    saleitemBuilder.model.normalize(item);
                    item._selectorTitle = item.name;

                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    saleitemBuilder.model.restize(item);
                    saleitemBuilder.utils.makeBool(item, ['__is_incomplete']);
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                //{name: 'getOverview', httpMethod: 'get', route: 'overview'},
            ],
            collection: [
                {name: 'getByBarcode', httpMethod: 'get', route: 'getByBarcode'},
                {name: 'getMostSoldSaleitem', httpMethod: 'get', route: 'mostSoldSaleitem'}


            ]
        }
    },
    service: {


        methods: {
            getByBarcode: function (barcode) {
                return this.model.getByBarcode({barcode: barcode});
            },

            getMostSoldSaleitem: function (filter) {
                return this.model.getMostSoldSaleitem(filter);
            },

            /!**
             * editConf ile popup suffix stay ayarlandı
             *!/
            //edit   : {
            //    before: function ($injector, data, popup) {
            //        var restOp = $injector.get('restOperationService');
            //        restOp.edit({
            //            type  : saleitemBuilder.domain,
            //            suffix: 'manager',
            //            data  : data,
            //            popup : popup
            //        });
            //
            //        /!**
            //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
            //         *!/
            //        return false;
            //    }
            //},
        }


    },
    list   : {
        controller: function ($injector) {
            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');
            vm.addToPackage      = function (item) {
                NotifyingService.notify('saleitemPackage:addItem', item);
            }
        }
    },
    // form   : {
    //     title     : 'Saleitem',
    //     controller: function ($injector, $scope, builder) {
    //         var vm = this;
    //
    //         // if(_.has(vm,'params.selectedType')){
    //         //     vm.params.selectedType =
    //         // }
    //     }
    // },
    manager: {
        controller: function ($injector, $scope, builder) {
            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');

            NotifyingService.subscribe($scope, builder.domain + ':updated', function (event, data) {
                vm.item = data.data;
            });
        }
    },
    layout : {
        templConfig: {
            showSidebarLeft: false
        }
    }
});

saleitemBuilder.generate();
*/
