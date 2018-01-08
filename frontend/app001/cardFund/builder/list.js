_.merge(cardFundBuilder.list,{
    controller: function ($injector, $scope, builder) {
        var vm               = this;
        var aptUtils         = $injector.get('aptUtils');
        var NotifyingService = $injector.get('NotifyingService');
        var service          = $injector.get(cardFundBuilder.getServiceName('service'));

        NotifyingService.subscribe($scope, 'card-fund-filter:set', function (event, filter) {
            service.vars.filter = filter;
            service.loadRepo(filter);
        });
    }
});