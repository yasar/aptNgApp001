/**
 * Created by unal on 04.04.2016.
 */




(function () {
    var _name   = 'invoiceProfile';
    var builder = cashSaleBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict    : 'EA',
            controller  : Controller,
            controllerAs: builder.getControllerAsName(_name),
            templateUrl : builder.getPath(_name) + '/' + _name + '.tpl.html'
        }
    }

    Controller.$inject = ['CashSaleDataService', '$templateCache', 'dialogs'];

    function Controller(CashSaleDataService, $templateCache, dialogs) {

        var vm = this;

        vm.selectBillingAddress   = selectBillingAddressFn;
        vm.editClient             = editClientFn;
        vm.selectInvoiceRecipient = selectInvoiceRecipientFn;

        vm.invoiceRecipient = CashSaleDataService.get('invoiceRecipient');
        var client          = CashSaleDataService.get('client');

        function selectBillingAddressFn(addresses) {
            var popupTpl = builder.getPath('cache') + '/popup.html';
            $templateCache.put(popupTpl, '<apt-cash-sale-billing-address-selector addresses="addresses"></apt-cash-sale-billing-address-selector>');
            dialogs.create(popupTpl, [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    $scope.addresses = addresses;
                    $uibModalInstance.close();

                }], undefined, {
                windowClass: 'slide-up'
            });
        }

        function editClientFn() {


            if (client.person_id) {
                var popupTpl = builder.getPath('cache') + '/popup.html';
                $templateCache.put(popupTpl, '<apt-person-manager item="person"></apt-person-manager>');
                dialogs.create(popupTpl, ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                    $scope.person = client.person;
                    $uibModalInstance.close();

                }], undefined, {
                    windowClass: 'slide-up'
                });

                /**
                 * todo :
                 * edit client dedikten sonra person manager formda persona ait bilgiler ve contact ve address bilgileri
                 * guncellenebilmektedir.Ama bu guncellenmelerin invoice profile yansıması için degisikliklerin yapıldıgının
                 * duyurulması gerekmektedir.simdilik bu işleme sonraya bırakıldı bug olarak not dusuldu.
                 */
            }


            if (vm.billTo.entity_id) {
                /**
                 * todo:
                 * entity client sectiginde person gibi yap.....
                 */
            }

        }


        function selectInvoiceRecipientFn() {
            var popupTpl = builder.getPath('cache') + '/popup.html';
            $templateCache.put(popupTpl, '<apt-cash-sale-invoice-recipient></apt-cash-sale-invoice-recipient>');
            dialogs.create(popupTpl, ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
                $uibModalInstance.close();
            }], undefined, {
                windowClass: 'slide-up'
            });
        }
    }

})();