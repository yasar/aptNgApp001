/**
 * Created by unal on 19.03.2016.
 */


var shoppingCartBuilder = new aptBuilder({
    domain : 'shoppingCart',
    package: 'app001',
    create : {
        listDirective    : false,
        formDirective    : false,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
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
            collection: null
        }
    },
    service: {
        init   : function ($injector) {
            this.vars.items             = [];
            this.vars.is_empty          = true;
            this.vars.keepOnRouteChange = false;
        },
        methods: {
            isEmpty              : function () {
                return this.vars.is_empty;
            },
            getItems             : function () {
                return this.vars.items;
            },
            addItem              : function (saleitem) {
                var aptTempl       = this.$injector.get('aptTempl');
                var dialogs        = this.$injector.get('dialogs');
                var _this          = this;
                var existingIdx    = null;
                this.vars.is_empty = false;


                existingIdx = _.findIndex(this.vars.items, {saleitem: {saleitem_id: saleitem.saleitem_id}});

                if (existingIdx !== -1) {

                    dialogs.create(shoppingCartBuilder.getPath('manager') + '/confirmAddNewOrIncrement.tpl.html', [
                        '$scope',
                        '$uibModalInstance',
                        function ($scope, $uibModalInstance) {
                            $scope.increment = function () {
                                increment();
                                $uibModalInstance.close();
                            };
                            $scope.addNew    = function () {
                                addNew();
                                $uibModalInstance.close();
                            };
                        }], undefined, {
                        size       : 'sm',
                        keyboard   : true,
                        backdrop   : true,
                        animation  : true,
                        windowClass: 'text-default bg-opacity-50'
                    });
                } else {
                    addNew();
                }

                function addNew() {
                    _this.vars.items.push({qty: 1, currency_rate: null, saleitem: saleitem});
                }

                function increment() {
                    _.nth(_this.vars.items, existingIdx).qty++;
                }

            },
            editItem             : function (saleitem) {
                var saleitemService = this.$injector.get(saleitemBuilder.getServiceName('service'));
                saleitemService.edit(saleitem, {
                    suffix: 'manager'
                });

            },
            removeItem           : function (saleitem) {
                var aptUtils            = this.$injector.get('aptUtils');
                var CashSaleDataService = this.$injector.get('CashSaleDataService');
                var vars                = this.vars;

                aptUtils.showDeleteConfirm(accept);

                function accept() {
                    _.remove(vars.items, saleitem);
                    vars.is_empty = !!vars.items.length;
                    CashSaleDataService.refresh();
                }
            },
            getCalculatedRowPrice: function (row) {
                var returnObj = {
                    total              : 0,
                    price              : 0,
                    discounted_price   : 0,
                    taxed_price        : 0,
                    before_tax_price   : 0,
                    tax_amount         : 0,
                    tax_percentage     : 0,
                    discount_percentage: 0,
                    discount_amount    : 0,
                    is_tax_included    : null
                };

                if (!row.price.price) {
                    return returnObj;
                }

                ///

                returnObj.price           = row.price.price * 1;
                returnObj.is_tax_included = row.price.is_tax_included;

                ///

                if (row.price.discount_type == 'percentage' && row.price.discount_percentage) {
                    returnObj.discount_percentage = row.price.discount_percentage * 1;
                    returnObj.discount_amount     = returnObj.price * returnObj.discount_percentage / 100;
                    returnObj.discount_type       = 'percentage';
                } else if (row.price.discount_type == 'amount' && row.price.discount_amount) {
                    returnObj.discount_amount     = row.price.discount_amount * 1;
                    returnObj.discount_percentage = returnObj.discount_amount / returnObj.price * 100;
                    returnObj.discount_type       = 'amount';
                }

                returnObj.discounted_price = returnObj.price - returnObj.discount_amount;

                ///

                if (row.price.tax) {
                    returnObj.tax_percentage = row.price.tax.tax_percentage * 1;
                    if (row.price.is_tax_included) {
                        returnObj.tax_amount       = returnObj.discounted_price * (1 - 1 / (1 + returnObj.tax_percentage / 100));
                        returnObj.before_tax_price = returnObj.discounted_price - returnObj.tax_amount;
                    } else {
                        returnObj.tax_amount       = returnObj.discounted_price * returnObj.tax_percentage / 100;
                        returnObj.before_tax_price = returnObj.discounted_price;
                    }
                } else {
                    returnObj.before_tax_price = returnObj.discounted_price;
                }

                returnObj.taxed_price = returnObj.before_tax_price + returnObj.tax_amount;

                ///

                // returnObj.total = returnObj.price - returnObj.discount_amount + returnObj.tax_amount;
                returnObj.total = returnObj.taxed_price;

                return returnObj;
            }
        }


    },
    manager: {
        controller: function ($injector, $scope, builder) {
            var vm                         = this;
            var dialogs                    = $injector.get('dialogs');
            var $templateCache             = $injector.get('$templateCache');
            var service                    = $injector.get(shoppingCartBuilder.getServiceName('service'));
            var SaleitemPriceService       = $injector.get(saleitemPriceBuilder.getServiceName('service'));
            var aptUtils                   = $injector.get('aptUtils');
            var NotifyingService           = $injector.get('NotifyingService');
            var $timeout                   = $injector.get('$timeout');
            vm.removeItem                  = removeItemFn;
            vm.editItem                    = editItemFn;
            vm.showDiscountPopup           = showDiscountPopupFn;
            vm.openSaleitemPriceSelectForm = openSaleitemPriceSelectFormFn;
            //vm.refresh           = service.refresh;
            // vm.items             = vm.items || aptUtils.showError('ShoppingCart requires `items` in the bindings.');

            vm.items = service.vars.items;

            vm.for            = _.has(vm, 'params.for') ? vm.params.for : 'sale'; // could be `sale` or `purchase`
            vm.showTotalPrice = _.has(vm, 'params.showTotalPrice') ? vm.params.showTotalPrice : false;
            vm.tableOptions   = {
                showHeader : false,
                addRowIndex: true,
                addRowMenu : false
            };

            if (vm.showTotalPrice) {
                $scope.$watch(function () {
                    return vm.items;
                }, function (newVal, oldVal) {

                    if (_.isUndefined(newVal) || _.isEqual(newVal, oldVal)) {
                        return;
                    }
                    calculateTotalPrice();
                }, true);
            }

            function calculateTotalPrice() {

                vm.totalPrice     = 0;
                vm.totalTax       = 0;
                vm.totalBasePrice = 0;

                /**
                 * total bilgileri için fiyat birimi manuel atandı
                 * @type {{currency_code: string}}
                 */
                vm.total          = {
                    currency_code: 'try'
                };

                if (vm.for == 'purchase') {
                    updateTotalForCalculatedRow();
                    return;
                }

                angular.forEach(vm.items, function (item) {
                    vm.totalPrice += item.saleitem.taxed_price * item.qty;
                    vm.totalTax += item.saleitem.tax * item.qty;
                    vm.totalBasePrice += item.saleitem.base_price * item.qty;
                })
            }


            if (vm.for == 'purchase') {
                // initForPurchase();
                vm.calculateRow = calculateRow;
            }

            /**
             * alıs veya satıs faturasında eklenen urunler cash sale module ıle birlikte ortak olarak
             * shoppin cart menuyu kullanıyor. alıs veya satıs faturasından sonra shoppinkarta eklenen
             * urunler cash sale ekranına geldigimizde shopping cart menude yer alıyor.
             * eger alıs vey satıs faturasından sonra cash sale ekranına gelirsek
             * shopping karttaki saleitemları sıfırlamamız gerekiyor.
             */
            $scope.$on('$destroy', function () {
                if (service.vars.keepOnRouteChange) {
                    service.vars.keepOnRouteChange = false;
                } else {
                    if (service.vars.items.length > 0) {
                        service.vars.items.splice(0, service.vars.items.length)
                    }
                }
            });


            function removeItemFn(item) {
                service.removeItem(item);
            }

            function editItemFn(item) {
                service.editItem(item.saleitem);
            }

            function openSaleitemPriceSelectFormFn(item) {
                SaleitemPriceService.openSaleitemPriceSelectForm(item, function (price) {

                    item.base_price     = price.base_price;
                    item.taxed_price    = price.taxed_price;
                    item.currency_code  = price.currency_code;
                    item.currency_id    = price.currency_id;
                    item.tax            = price.tax;
                    item.tax_percentage = price.tax_percentage;
                    item.price_id       = price.price_id;
                });
            }

            function showDiscountPopupFn(saleitem) {
                var popupTpl = builder.getPath('cache') + '/popup.html';
                $templateCache.put(popupTpl,
                    '<apt-cash-sale-set-discount saleitem="saleitem" close-discount-form="closeForm(data)" discount-accepted="discountAccepted(data)"></apt-cash-sale-set-discount>');
                dialogs.create(popupTpl, [
                    '$scope',
                    '$uibModalInstance',
                    function ($scope, $uibModalInstance) {
                        $scope.saleitem         = saleitem;
                        $scope.discountAccepted = function (newPrice) {
                            saleitem.newPrice = newPrice;
                            $uibModalInstance.close();
                        };

                        $scope.closeForm = function (result) {
                            result ? $uibModalInstance.close() : null;

                        }

                    }], undefined, {
                    windowClass: 'slide-up'
                });
            }

            function calculateRow(row) {
                row.calculated = service.getCalculatedRowPrice(row);
            }

            function updateTotalForCalculatedRow() {

                angular.forEach(vm.items, function (item) {

                    if (!_.has(item, 'calculated')) {
                        return;
                    }
                    vm.totalPrice += item.calculated.taxed_price * item.qty;
                    vm.totalTax += item.calculated.tax_amount * item.qty;
                    vm.totalBasePrice += item.calculated.before_tax_price * item.qty;
                })
            }

            // function initForPurchase() {
            //     $scope.$watch(function () {
            //         return vm.items;
            //     }, function (newVal, oldVal) {
            //         if (!newVal || _.isEqual(newVal, oldVal)) {
            //             return;
            //         }
            //
            //         // var changedRow           = _.differenceWith(newVal, oldVal, _.isEqual);
            //         for(var i=0; i<newVal.length; i++){
            //             if(! _.isEqual(newVal[i], oldVal[i])){
            //
            //             }
            //         }
            //         changedRow[0].calculated = service.getCalculatedRowPrice(changedRow[0]);
            //     }, true);
            // }

        }
    }
});

shoppingCartBuilder.generate();
