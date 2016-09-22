(function () {

    var directiveName = 'ClientCardManager';
    var path          = 'app001/clientCard/directives/manager';
    angular.module('apt.app001.clientCard').directive('apt' + directiveName, fn);
    function fn() {
        return {
            restrict        : 'AE',
            replace         : true,
            scope           : {
                bindingId: '@',
                bindTo   : '@',
                model    : '=ngModel'
            },
            templateUrl     : templateUrlFn,
            controller      : controllerFn,
            controllerAs    : 'vm' + directiveName,
            bindToController: true,
            link            : linkFn
        };

        function templateUrlFn(elem, attrs) {
            if (attrs.viewType) {
                return path + '/manager.' + attrs.viewType + '.tpl.html';
            } else {
                return path + '/manager.tpl.html';
            }
        }

        function linkFn(scope, elem) {
        }
    }

    controllerFn.$inject = ['$scope', 'aptUtils', 'ClientCardModel', 'Restangular',
        '$injector', 'restOperationService', '$templateCache', 'dialogs'];
    function controllerFn($scope, aptUtils, ClientCardModel, Restangular, $injector,
                          restOp, $templateCache, dialogs) {
        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');
        var aptTempl         = $injector.get('aptTempl');

        vm.clientCards              = [];
        vm.selectedItemClientCardId = null;
        vm.selectedItem             = null;
        vm.selectItem               = selectItemFn;
        vm.createClientCard         = createClientCardFn;
        vm.new                      = newFn;
        // /**
        //  * edit iptalinde new fonksiyonu devreye giriyor
        //  */
        // vm.cancelEdit = vm.new;

        function loadClientCardList() {
            var bindToModel = $injector.get(_.capitalize(vm.bindTo) + 'Model');
            return bindToModel.one(vm.bindingId).getClientCardList().then(function (data) {
                aptUtils.emptyAndMerge(vm.clientCards, data);
            });
        }


        function selectItemFn(item) {
            vm.selectedItemClientCardId = item.client_card_id;
            vm.selectedItem             = item;
        }


        function newFn() {
            vm.selectedItem = Restangular.one('clientCard');
        }


        function createClientCardFn() {
            var bindingConf = {
                client_id: vm.bindingId,
                mode     : 'new'
            };

            aptTempl.blurPage(true);

            $templateCache.put('app001/clientCard/directives/clientCardPopUp.html',
                '<section data-apt-client-card-form params="bindingConf"></section>');
            dialogs.create('app001/clientCard/directives/clientCardPopUp.html', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {

                    $scope.bindingConf = bindingConf;

                    NotifyingService.subscribe($scope, clientCardBuilder.domain + ':added', function (event) {
                        loadClientCardList();
                        $uibModalInstance.close();
                        aptTempl.blurPage(false);
                    });

                    NotifyingService.subscribe($scope, clientCardBuilder.domain + '.formCanceled', function () {
                        $uibModalInstance.close('apt:formCloseConfirmed');
                        aptTempl.blurPage(false);
                    }, false);

                }], undefined, aptTempl.appConfig.defaults.dialogs.medium);
        }

        vm.new();
        loadClientCardList();

        NotifyingService.subscribe($scope, clientCardBuilder.domain + ':updated', function (event) {
            loadClientCardList();
        });

        NotifyingService.subscribe($scope, clientCardBuilder.domain + '.formCanceled', function (event) {
            vm.selectedItemClientCardId = null;
            vm.selectedItem             = null;
        });


    }


}());