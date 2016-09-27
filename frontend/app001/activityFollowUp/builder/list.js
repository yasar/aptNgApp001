/**
 * Created by yasar on 26.09.2016.
 */
_.merge(activityFollowUpBuilder.list, {
    onBeforeReload: function ($injector, vm, $scope) {
        vm.isLoaded = false;

        /**
         * return true so that reload can proceed
         */
        return true;
    },
    link          : function ($injector, builder, scope, elem, attrs, ctrls) {
        var vm               = scope[builder.getControllerAsName('list')];
        var $timeout         = $injector.get('$timeout');
        var NotifyingService = $injector.get('NotifyingService');
        vm.isLoaded          = false;

        scope.$watch(function () {
            return vm.data_Virtual;
        }, function () {
            if (vm.isLoaded) {
                proceed();
            }
        });

        NotifyingService.subscribe(scope, builder.domain + ':loaded', function () {
            vm.isLoaded = true;
        }, true);

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
            }, 300);
        };
    },
});