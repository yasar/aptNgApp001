/**
 * Created by burak on 27.09.2016.
 */
_.merge(clientBuilder.selector, {
    controller: function ($injector, $scope, builder) {

        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');
        var aptUtils         = $injector.get('aptUtils');
        var $timeout         = $injector.get('$timeout');
        var gettextCatalog   = $injector.get('gettextCatalog');
        var service          = $injector.get(builder.getServiceName('service'));

        if (_.isFunction(vm.onChange)) {
            NotifyingService.subscribe($scope, 'cardReader:client', function (event, cardObj) {
                var waitConf = {
                    title   : gettextCatalog.getString('Finding client'),
                    message : gettextCatalog.getString('Please wait while the client card is being searched'),
                    progress: 10
                };
                aptUtils.showWait(waitConf);
                service.getByCardNr({card_nr: cardObj.data}).then(function (data) {
                    // vm.selectedItem(null); // didn't work, we should find another way to reset the selected item if there is any.

                    if (!data || data == 'false') {
                        waitConf.progress = 0;
                        waitConf.message  = 'Nothing found.';
                    } else {
                        waitConf.progress = 80;
                        vm.onChange({data: data});
                        $timeout(function () {
                            waitConf.progress = 100;
                        }, 100);
                    }
                });
            });
        }
    }
});