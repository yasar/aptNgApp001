/**
 * Created by engin on 26.09.2016.
 */
_.merge(shoppingCartBuilder.service,{
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
            /**
             * this happened on live demo.
             * not an intensive debug performed but
             * it could be a duplicate call to this method.
             */
            if(_.isUndefined(saleitem)){
                return;
            }
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


})