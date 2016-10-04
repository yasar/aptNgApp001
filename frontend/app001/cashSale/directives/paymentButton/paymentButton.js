/**
 * Created by unal on 18.08.2015.
 */

(function () {

    var _name   = 'paymentButton';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'AE',
            replace     : true,
            templateUrl : function (elem, attrs) {
                var viewType = attrs.viewType ? attrs.viewType : 'direct';
                return builder.getPath(_name) + '/' + _name + '-' + viewType + '.tpl.html';
            },
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
        };
    }

    Controller.$inject = ['$scope', '$templateCache', 'dialogs', '$injector'];
    function Controller($scope, $templateCache, dialogs, $injector) {
        var vm                     = this;
        var ShoppingCartService    = $injector.get('ShoppingCartService');
        var CashSalePaymentService = $injector.get('CashSalePaymentService');
        var CouponService          = $injector.get('CouponService');
        var CashSaleDataService    = $injector.get('CashSaleDataService');
        var Restangular            = $injector.get('Restangular');
        var aptUtils               = $injector.get('aptUtils');
        var gettextCatalog         = $injector.get('gettextCatalog');
        var NotifyingService       = $injector.get('NotifyingService');
        vm.showPaymentOptions      = showPaymentOptionsFn;
        vm.finishPayment           = finishPaymentFn;
        vm.default_payment_type    = {};

        // var paymentVars         = CashSalePaymentService.getVars();
        $scope.$watch(function () {
            return CashSalePaymentService.getVars().default_payment_type
        }, function (data) {
            vm.default_payment_type = data;
        });

        ///
        function finishPaymentFn() {
            var waitConf = {
                title   : gettextCatalog.getString('Processing payment'),
                message : gettextCatalog.getString('Please wait while payment is being processed'),
                progress: 10
            };
            aptUtils.showWait(waitConf);
            CashSalePaymentService.processPayment().then(function (result) {
                if (!result) {
                    aptUtils.showError('Warning', 'Payment has not been processed successfully.');
                }
                NotifyingService.notify('shopping-cart:reset');
                CashSaleDataService.reset();
                CashSalePaymentService.reset();
                waitConf.progress = 100;
                var title         = gettextCatalog.getString('Successfull');
                var message       = gettextCatalog.getString('Payment has been processed successfully.');
                aptUtils.showInfo(title, message);
            });
        }

        function showPaymentOptionsFn() {
            var popupTpl = builder.getPath('cache') + 'paymentButtonPopup.html';
            $templateCache.put(popupTpl, '<apt-cash-sale-payment-options></apt-cash-sale-payment-options>');
            dialogs.create(popupTpl, [
                '$scope',
                '$uibModalInstance',
                'CouponService',
                function ($scope, $uibModalInstance, CouponService) {


                    $uibModalInstance.close();

                    /**
                     * sale manager ekranından sonra odeme ekranına geçildiginde odeme tipi
                     * veya ödeme tutarına göre kuponlar listelenecektir.bundan doları reset
                     * methodu ile sale managerdan gelen couponlara sıfırladık.
                     */
                    //CouponService.reset();

                }], undefined, {
                windowClass: 'slide-up'
            });

        }
    }

})();


