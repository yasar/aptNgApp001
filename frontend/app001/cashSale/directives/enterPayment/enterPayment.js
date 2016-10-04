/**
 * Created by unal on 09.09.2015.
 */


(function () {

    var _name   = 'enterPayment';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html',
            // scope           : {},
            // bindToController: {
            //     payment_type: '=paymentType'
            // }
        }
    }


    Controller.$inject = ['$scope', 'CashSalePaymentService', 'CouponService', '$injector', 'CashSaleDataService'];
    function Controller($scope, CashSalePaymentService, CouponService, $injector, CashSaleDataService) {
        var vm             = this;
        var gettextCatalog = $injector.get('gettextCatalog');
        var aptUtils       = $injector.get('aptUtils');
        var paymentVars    = CashSalePaymentService.getVars();
        var saleData       = CashSaleDataService.getData();

        vm.addSplit    = addSplit;
        vm.compensate  = compensate;
        vm.split       = {};
        vm.sales_total = saleData.newTotal.grand;
        vm.balance     = paymentVars.total_balance;
        // vm.discount   = paymentVars.total_discount;
        vm.is_active   = false;

        $scope.$watch(function () {
            return paymentVars.total_balance;
        }, function (newVal, oldVal) {
            if (_.isUndefined(newVal) || _.isNull(newVal)) {
                vm.balance = vm.sales_total;
                return;
            }

            /**
             * if balance is not set then
             * we can assume no payment has been made yet, and
             * the balance should be the sales_total.
             */
            vm.balance = newVal;
        }, true);

        // $scope.$watch(builder.vm(_name, 'payment_type'), function (newVal, oldVal) {
        //     if (angular.isUndefined(newVal) || newVal == oldVal) {
        //         return;
        //     }
        //
        //     init();
        // });

        vm.payment_types = CashSalePaymentService.getPaymentTypes(function () {
            vm.payment_type = _.find(vm.payment_types, {name: 'cash'});
            init();
        });

        vm.setPaymentType = function (payment_type) {
            vm.payment_type = payment_type;
            init();
        };


        function init() {
            if (!saleData.newTotal.grand || !vm.payment_type) {
                vm.is_active = false;
                return;
            }

            vm.max_limit = CashSalePaymentService.getMaxLimit(vm.payment_type.name);
            vm.is_active = true;
        }

        function addSplit() {
            vm.split.payment *= 1;

            if (_.isNaN(vm.split.payment)) {
                vm.split.payment = 0;
            }

            if (vm.split.payment > vm.balance) {
                aptUtils.showWarning(gettextCatalog.getString('More than required')
                    , gettextCatalog.getString('The amount you entered is more than what needs to be paid'));
                vm.split.payment = vm.balance;
                return;
            }

            if (!_.isNull(vm.max_limit) && vm.split.payment > vm.max_limit) {
                aptUtils.showWarning(gettextCatalog.getString('Limit Exceeded')
                    , gettextCatalog.getString('The amount you entered is more than maximum allowed limit'));
                vm.split.payment = vm.max_limit;
                return;
            }

            if (vm.split.payment <= 0) {
                aptUtils.showWarning(gettextCatalog.getString('Payment Amount')
                    , gettextCatalog.getString('Please enter an amount bigger than 0'));
                return;
            }

            if (_.has(vm.payment_type, 'restangularized')) {
                vm.split.payment_type = vm.payment_type.plain();
            } else {
                vm.split.payment_type = vm.payment_type;
            }

            CashSalePaymentService.addSplit(vm.split);
            vm.max_limit = CashSalePaymentService.getMaxLimit(vm.payment_type.name);
            vm.split     = {};

            /**
             * ShoppingCartService.refresh() will call the Coupon.inspect() and based on return data
             * it will update SaleData accordingly.
             */
            CashSaleDataService.refresh();


        }

        function compensate() {
            vm.split.payment = vm.balance;
        };
    }

})();
