/**
 * Created by unal on 31.03.2016.
 */


(function () {
    var _name   = 'paymentService';
    var builder = cashSaleBuilder;

    angular.module(builder.getModuleName()).factory(builder.getServiceName(_name), fn);

    fn.$inject = ['NotifyingService', 'TypeModel', 'CashSaleDataService', 'Restangular'];
    function fn(NotifyingService, TypeModel, CashSaleDataService, Restangular) {

        var saleData = CashSaleDataService.getData();

        var vars = {
            total_balance       : null,
            total_payment       : 0,
            default_payment_type: null,
            /**
             * remember that vars.splits will be retrieved by CouponService when its inspect() method is invoked.
             */
            splits              : [],
            paymentTypes        : []
        };

        var serviceObj = {
            getPaymentTypes      : getPaymentTypes,
            setDefaultPaymentType: setDefaultPaymentType,
            addSplit             : addSplit,
            getMaxLimit          : getMaxLimit,
            removeSplit          : removeSplit,
            resetSplits          : resetSplits,
            processPayment       : processPayment,
            getVars              : getVars,
            reset                : reset
        };

        return serviceObj;

        function getVars() {
            return vars;
        }

        function setDefaultPaymentType(payment_type) {
            vars.default_payment_type = payment_type;
        }


        function addSplit(newSplit) {
            _.defaults(newSplit, {
                payment     : 0,
                payment_type: null
            });
            newSplit.payment *= 1;
            vars.total_payment += newSplit.payment;
            vars.total_balance = saleData.newTotal.grand - vars.total_payment;

            /**
             * check if we have any split of the same type in the list
             */
            var existingSplit = _.find(vars.splits, {payment_type: {type_id: newSplit.payment_type.type_id}});
            if (existingSplit) {
                existingSplit.payment += newSplit.payment;
            } else {
                vars.splits.push(newSplit);
            }

            deductFromMaxLimit(newSplit);
        }

        function getPaymentTypeMappingForClientStats(payment_type_name) {
            var props = {
                points_cash: 'total_points',
                card_fund  : 'total_fund'
            };

            if (_.has(props, payment_type_name)) {
                return _.get(props, payment_type_name);
            }
            return null;
        }

        function deductFromMaxLimit(split) {
            var propName = getPaymentTypeMappingForClientStats(split.payment_type.name);
            if (!_.isNull(propName)) {
                saleData.clientStats[propName] -= split.payment * 1;
            }
        }

        function getMaxLimit(payment_type_name) {
            var propName = getPaymentTypeMappingForClientStats(payment_type_name);
            if (_.isNull(propName)) {
                return null;
            }
            return saleData.clientStats[propName] * 1;
        }

        function removeSplit(index) {
            var split = vars.splits[index];
            vars.total_payment -= split.payment;
            vars.total_balance += split.payment;
            vars.splits.splice(index, 1);
        }

        function resetSplits() {
            vars.splits.splice(0, vars.splits.length);
        }
        
        function reset(){
            vars.total_payment = 0;
            vars.total_balance=null;
            resetSplits();
        }

        function getPaymentTypes(callback) {
            if (vars.paymentTypes.length == 0) {
                TypeModel.getList({groupname: 'payment_type'}).then(function (data) {
                    angular.merge(vars.paymentTypes, data);
                    if (_.isFunction(callback)) {
                        callback();
                    }
                });
            }
            return vars.paymentTypes;
        }

        function processPayment() {
            var transaction = {
                saleItems              : saleData.saleItems,
                payment_splits         : vars.splits,
                default_payment_type_id: vars.default_payment_type.type_id,
                client_id              : saleData.client.client_id,
                invoice_recipient      : saleData.invoiceRecipient,
            };

            _.forEach(transaction.payment_splits, function (split) {
                split.payment_type_id = split.payment_type.type_id;
                delete split.payment_type;
            });

            // _.forEach(transaction.saleItems, function(sale_item){
            //     sale_item.saleitem_id = sale_item.saleitem.saleitem_id;
            //     delete sale_item.saleitem;
            // });

            return Restangular.one('app001/payment').post('process', transaction);
        }
    }

})();
