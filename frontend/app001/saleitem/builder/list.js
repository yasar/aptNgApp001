/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemBuilder.list, {
    editConf  : {
        suffix: 'manager',
        popup : true,
        stay  : true
    },
    controller: function ($injector) {
        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');
        vm.addToPackage      = function (item) {
            NotifyingService.notify('saleitemPackage:addItem', item);
        }
    }
})