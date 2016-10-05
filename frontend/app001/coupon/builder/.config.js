/**
 * Created by burak on 26.09.2016.
 */
var couponBuilder = new aptBuilder({
    domain            : 'coupon',
    package           : 'app001',
    icon              : 'icon-gift',
    enableStatusUpdate: true,
    title             : 'Coupon',
    menu              : {
        target: 'enterprise'
    },
    create            : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
    onRun             : function ($injector) {
        var hotkeys    = $injector.get('hotkeys');
        var $rootScope = $injector.get('$rootScope');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 'ctrl+alt+c',
                description: 'Coupon Manager',
                callback   : function () {
                    var service = $injector.get(couponBuilder.getServiceName('service'));
                    service.showListing();
                }
            });
    },
    model             : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {

                    couponBuilder.utils.makeInt(item, ['is_published']);

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

                {name: 'getOverview', httpMethod: 'get', route: 'overview'},

                /**
                 * line 198'e açıklama yapıldı.
                 */
                //{name: 'checkValidity', httpMethod: 'get', route: 'checkValidity'}
            ],
            collection: [
                {name: 'inspect', httpMethod: 'post', route: 'couponInspector'}
            ]
        }
    },
    service           : {
        init: function ($injector) {
            // var PaymentService      = $injector.get('SalePaymentService'),
            //     ShoppingCartService = $injector.get('SaleShoppingCartService'),
            //     CashSaleDataService     = $injector.get('CashSaleDataService');

        },

        //edit: {
        //    before: function ($injector, data, popup) {
        //        var restOp = $injector.get('restOperationService');
        //        restOp.edit({
        //            type  : couponBuilder.domain,
        //            suffix: 'manager',
        //            data  : data,
        //            popup : popup
        //        });
        //
        //        /**
        //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
        //         */
        //        return false;
        //    }
        //},

        methods: {
            getOverview: function (couponId) {
                return this.model.one(couponId).getOverview();
            },

            inspect: function () {
                var PaymentService      = this.$injector.get('CashSalePaymentService');
                var CashSaleDataService = this.$injector.get('CashSaleDataService');
                // var ShoppingCartService = this.$injector.get('SaleShoppingCartService');
                var paymentData         = PaymentService.getVars();
                var saleData            = CashSaleDataService.getData();

                return this.model.inspect({
                    default_payment_type_id: paymentData.default_payment_type.type_id,
                    client_id              : saleData.client.client_id,
                    payment_splits         : paymentData.splits,
                    saleItems              : saleData.saleItems
                });
            },

            /**
             * gerekli açıklama line 198'e yapıldı
             */
            /*  checkValidity: function (coupon_id) {
             return this.model.one(coupon_id).checkValidity();
             },
             */
            showListing: function () {
                var dialogs        = this.$injector.get('dialogs');
                var $templateCache = this.$injector.get('$templateCache');

                $templateCache.put(couponBuilder.getPath('cache') + '/couponListPopup',
                    '<apt-panel class="no-margin"><apt-panel-title><span translate>Coupons</span></apt-panel-title>' +
                    '<apt-coupon-list></apt-coupon-list></apt-panel>');
                dialogs.create(couponBuilder.getPath('cache') + '/couponListPopup', [
                    '$scope',
                    '$uibModalInstance',
                    function ($scope, $uibModalInstance) {

                        $uibModalInstance.close();

                    }], undefined, {
                    windowClass: 'slide-up'
                });
            }
        }


    },
    list              : {
        rowMenu   : function ($injector, vm) {
            var Menu    = $injector.get('aptMenu'),
                restOp  = $injector.get('restOperationService'),
                service = $injector.get(couponBuilder.getServiceName('service'));

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });

            var menuItemEdit = Menu.Item({
                text   : 'Edit',
                icon   : 'edit',
                'class': 'btn-success',
                show   : function (item) {
                    if (item.coupon_status == 'draft') {
                        return true;
                    } else {
                        return false;
                    }
                },
                click  : function (item) {
                    service.edit(item, {popup: true, stay: true, suffix: 'manager'});

                }
            });

            var menuItemDelete = Menu.Item({
                text   : 'delete',
                icon   : 'delete',
                'class': 'btn-danger',
                click  : function (item) {
                    restOp.delete({type: 'couponReward', data: item, allData: service.getRepo()});

                }
            });


            rowMenu.addChild(menuItemEdit);
            rowMenu.addChild(menuItemDelete);
            return rowMenu;
        },
        controller: function ($injector, $scope, builder) {
            var vm = this;

            /**
             * kupon kontrol ozelligi daha sonraki bir surume ertelendi.
             * eklenecek ozellik kupon taslak asamasında iken yayınlanmadan once
             * kuponun kullanılabilirliği için gerekli bilgi girişinin yapılıp yapılmadıgını kontrol edecek.
             */
            /* $scope.$watch(function () {
             return vm.data;
             }, function (newVal, oldVal) {

             if (_.isUndefined(newVal) || _.isEqual(newVal, oldVal)) {
             return;
             }
             checkValidityCoupon();
             }, true);

             function checkValidityCoupon() {
             var service = $injector.get(couponBuilder.getServiceName('service'));

             angular.forEach(vm.data, function (item) {
             service.checkValidity(item.coupon_id);
             })
             }*/
        }
    },
    form              : {
        title       : 'Coupon',
        showHelp    : true,
        beforeCreate: function ($injector, $scope, builder) {
            var vm = this;
            //vm.stay = true;
        }
    },

});
