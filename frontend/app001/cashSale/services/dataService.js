/**
 * Created by unal on 26.10.2015.
 */

(function () {

    var _name   = 'dataService';
    var builder = cashSaleBuilder;

    angular.module(builder.getModuleName()).factory(builder.getServiceName(_name), fn);

    fn.$inject = ['$injector'];
    function fn($injector) {

        var aptUtils            = $injector.get('aptUtils');
        var ShoppingCartService = $injector.get(shoppingCartBuilder.getServiceName('service'));
        var CouponService       = $injector.get(couponBuilder.getServiceName('service'));

        var defaults = {
            flags           : {
                isEmpty         : false,
                isClientSelected: false,
                isInspecting    : false
            },
            // saleItems       : [],
            saleItems       : ShoppingCartService.vars.items,
            client          : {},
            newTotal        : {},
            points          : {},
            initialTotal    : {},
            coupons         : [],
            clientStats     : {},
            invoiceRecipient: {
                bill_to        : null,
                tckn           : null,
                tax_num        : null,
                tax_office     : null,
                billing_address: null,
                addresses     : []
            }
        };

        var data       = _.cloneDeep(defaults);
        //data.flags.isEmpty = ShoppingCartService.isEmpty();
        data.saleItems = ShoppingCartService.getItems();

        return {
            set    : set,
            get    : get,
            getData: getData,
            reset  : reset,
            refresh: refresh
        };

        function reset() {
            // data = _.cloneDeep(defaults);
            data.saleItems.splice(0, data.saleItems.length);
            data.coupons.splice(0, data.coupons.length);
            aptUtils.nullifyObjectProperties(data.client);
            aptUtils.nullifyObjectProperties(data.newTotal);
            aptUtils.nullifyObjectProperties(data.clientStats);
            aptUtils.nullifyObjectProperties(data.initialTotal);
            aptUtils.nullifyAndMerge(data.invoiceRecipient, defaults.invoiceRecipient);
            aptUtils.nullifyAndMerge(data.flags, defaults.flags);
        }

        function set(varName, value) {

            var dataProp = _.get(data, varName);

            /**
             * first check against array
             *
             * remember, array is also an object.
             * checking against object at first place,
             * will catch the arrays.
             */
            if (angular.isArray(dataProp)) {
                dataProp.splice(0, dataProp.length);
                angular.merge(dataProp, value);
            }

            else if (angular.isObject(dataProp)) {
                aptUtils.nullifyObjectProperties(dataProp);
                angular.extend(dataProp, value);
            }

            else {
                _.set(data, varName, value);
                // dataProp = value;
            }
        }

        function get(varName) {
            return _.get(data, varName);
            // return data[varName];
        }

        function getData() {
            return data;
        }

        function refresh() {

            var CouponService = $injector.get('CouponService');


            if (!data.saleItems.length) {
                this.set('newTotal', 0);
                this.set('initialTotal', 0);
                this.set('coupons', []);
            } else {
                this.set('flags.isInspecting', true);
                return CouponService.inspect().then(_.bind(function (data) {
                    /**
                     * remove the restangular part from the data.
                     */
                    data = data.plain();
                    this.set('newTotal', data.new_total);
                    this.set('initialTotal', data.total);
                    this.set('coupons', data.coupons);
                    this.set('points', data.points);

                    this.set('flags.isInspecting', false);
                }, this));
            }
        }

    }

})();
