/**
 * Created by yasar on 26.09.2016.
 */
_.merge(saleitemBuilder.routeConfig, {
    layout: {
        defaultChild: 'manager'
    },
    list: {
        template  : '<apt-panel><div data-apt-saleitem-list edit-conf="vmSaleitemList.editConf" add-new-conf="vmSaleitemList.addNewConf"></div></apt-panel>',
        controller: ['$scope',
            function ($scope) {
                var vm = this;

                vm.addNewConf = {
                    suffix: 'manager'
                };

                vm.editConf = {
                    suffix: 'manager',
                    popup : true,
                    stay  : true
                };


            }]
    }
});