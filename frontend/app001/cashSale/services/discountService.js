/**
 * Created by unal on 02.04.2016.
 */


(function () {
    var _name   = 'discountService';
    var builder = cashSaleBuilder;

    angular.module(builder.getModuleName()).factory(builder.getServiceName(_name), fn);

    fn.$inject = ['aptUtils'];

    function fn(aptUtils) {

        var newPrice = {
            basePrice : null,
            tax       : null,
            taxedPrice: null,
            discount  : null
        };
        var service  = {

            getNewPrice: function () {
                return newPrice;
            },

            resetNewPrice: function () {
                aptUtils.nullifyObjectProperties(newPrice);
            },

            calculateNewPrice: function (type, value, saleitem, isTaxIncluded, onTotal) {
                switch (type) {
                    case 'amount':
                        amount();
                        break;
                    case 'percentage':
                        percentage();
                        break;
                    case 'new_price':
                        newTotalPrice();
                        break;
                }

                function amount() {

                    if (onTotal) {

                        newPrice.taxedPrice = ((saleitem.saleitem.taxed_price * saleitem.qty) - (value * 1)) / saleitem.qty;
                        newPrice.basePrice  = (newPrice.taxedPrice / (1 + (saleitem.saleitem.tax_percentage / 100)));

                    } else {

                        newPrice.basePrice  = ((saleitem.saleitem.base_price - value) * 1);
                        newPrice.taxedPrice = newPrice.basePrice + (newPrice.basePrice * saleitem.saleitem.tax_percentage) / 100;

                    }
                    newPrice.tax      = newPrice.taxedPrice - newPrice.basePrice;
                    newPrice.discount = saleitem.saleitem.base_price - newPrice.basePrice;
                }

                function percentage() {
                    newPrice.basePrice  = (saleitem.saleitem.base_price) - ((saleitem.saleitem.base_price * value) / 100);
                    newPrice.taxedPrice = newPrice.basePrice + (newPrice.basePrice * saleitem.saleitem.tax_percentage) / 100;
                    newPrice.tax        = newPrice.taxedPrice - newPrice.basePrice;
                    newPrice.discount   = saleitem.saleitem.base_price - newPrice.basePrice;
                }

                function newTotalPrice() {

                    if (onTotal) {

                        if (isTaxIncluded) {
                            newPrice.taxedPrice = (value * 1) / saleitem.qty;
                            newPrice.basePrice  = newPrice.taxedPrice / (1 + ( saleitem.saleitem.tax_percentage) / 100);
                        } else {
                            newPrice.basePrice  = (value * 1) / saleitem.qty;
                            newPrice.taxedPrice = newPrice.basePrice + (newPrice.basePrice * saleitem.saleitem.tax_percentage) / 100;
                        }

                    } else {
                        if (isTaxIncluded) {
                            newPrice.taxedPrice = value * 1;
                            newPrice.basePrice  = (newPrice.taxedPrice / ((1 + saleitem.saleitem.tax_percentage) / 100));

                        } else {
                            newPrice.basePrice  = value * 1;
                            newPrice.taxedPrice = newPrice.basePrice + (newPrice.basePrice * saleitem.saleitem.tax_percentage) / 100;
                        }
                    }

                    newPrice.tax      = newPrice.taxedPrice - newPrice.basePrice;
                    newPrice.discount = saleitem.saleitem.base_price - newPrice.basePrice;


                }
            }
        };

        function calculateNewPriceWithTaxPrice() {
        }

        function calculateNewPriceWithoutTaxPrice() {
        }

        return service;
    }
})();