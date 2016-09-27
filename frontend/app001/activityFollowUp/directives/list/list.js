/**
 * Created by murat on 07.03.2016.
 */
(function () {
    return;
    var _name   = 'list';
    var builder = activityFollowUpBuilder;

    angular
        .module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), fn);

    fn.$inject = ['$timeout'];
    function fn($timeout) {
        return {
            restrict    : 'A', // ACME
            scope       : {},
            templateUrl : builder.getPath(_name) + '/list.tpl.html',
            controller  : controllerFn,
            link        : linkFn,
            controllerAs: builder.getControllerAsName(_name),
            replace     : true
        };

        function linkFn($scope, elem, attrs) {
            var vm      = $scope[builder.getControllerAsName(_name)];
            var watcher = $scope.$watch(function () {
                return vm.isLoaded;
            }, function () {
                if (vm.isLoaded) {
                    proceed();
                    watcher();
                }
            });

            function proceed() {
                var strCheck = '<i class="icon-checkmark"></i>', strNA = '<i class="icon-cross"></i>';
                $timeout(function () {
                    elem.find('tr').each(function (keyTR, itemTR) {
                        var total = 0, nulls = 0;
                        itemTR    = angular.element(itemTR);
                        itemTR.find('td').each(function (key, item) {
                            if (key < 11) {
                                return;
                            }

                            item = angular.element(item);

                            if (item.html() == 'true') {
                                item.html(strCheck);
                                item.removeClass('bg-danger-300 bg-info-300').addClass('bg-success-300');
                            } else if (item.html() == '' || item.html() == 'false') {
                                item.html(strNA);
                                item.removeClass('bg-success-300 bg-info-300').addClass('bg-danger-300');
                                // nulls++;
                                // } else if (item.html() !== strCheck && item.html() !== strNA) {
                            } else {
                                item.removeClass('bg-danger-300 bg-success-300').addClass('bg-info-300');
                                // } else if (item.html() == strNA) {
                            }

                            if (item.html() == strNA) {
                                nulls++;
                            }

                            total++;
                        });
                        var progressPercent = itemTR.find('td>.progressPercent');
                        progressPercent.html(Math.floor((total - nulls) / total * 100) + '%');
                    });
                });
            };
        }
    }

    controllerFn.$inject = ['$injector', 'restOperationService'];

    function controllerFn($injector, restOp) {

        var vm      = this;
        var model   = $injector.get(builder.getServiceName('model'));
        // vm.data = vm.item;
        vm.data     = [];
        vm.isLoaded = false;
        vm.edit     = edit;

        model.getList().then(function (data) {
            angular.merge(vm.data, data);
            vm.isLoaded = true;
        });

        function edit(item) {
            restOp.edit({type: 'activity-follow-up', data: item});
        }

    }

})();