_.merge(cardFundBuilder.form,{
    enableAddBefore: false,
    defaults    : function ($injector, $scope, builder) {
        var service  = $injector.get(saleBuilder.getServiceName('service'));
        var defaults = _.defaults({}, _.get(service, 'vars.filter'), {date: moment()});
        return defaults;
    },
    beforeCreate: function ($injector, $scope, builder) {
    },
    controller  : function ($injector, $scope, builder) {
        var vm = this;

        vm.form.vars.selectedClientCard = null;
    },
    onBeforeSubmit: function ($injector, $scope, formObj) {
        var vm       = $scope.vmCardFundForm;
        var $q       = $injector.get('$q');
        var $timeout = $injector.get('$timeout');
        var defer    = $q.defer();

        $timeout(function () {
            formObj.data.card_id = vm.form.vars.selectedClientCard.card_id;
            defer.resolve(true);
        });

        return defer.promise;

    }
});
