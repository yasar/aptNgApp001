/**
 * Created by engin on 26.09.2016.
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