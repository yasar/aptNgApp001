/**
 * Created by engin on 26.09.2016.
 */
var saleitemPackageBuilder = new aptBuilder({
    domain : 'saleitemPackage',
    package: 'app001',
    icon   : 'icon-station',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true
    },
    manager: {
        controller: function ($injector, $scope, builder) {
            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');
            var Restangular      = $injector.get('Restangular');
            var service          = $injector.get(builder.getServiceName('service'));
            var model            = $injector.get(builder.getServiceName('model'));

            vm.tableOptions = {
                showAddNewButton: false,
                addRowIndex     : false,
                addRowMenu      : false
            };

            NotifyingService.subscribe($scope, 'saleitemPackage:addItem', function (event, item) {
                addSaleitemPackageItem(item).then(function (data) {
                    angular.merge(item, data);
                    service.addPackageItem(item);
                });
                // $scope.$apply();
            });

            /**
             * eklenen saleitem ilk once veri tabanına ekleniyor daha sonra listede gosteriliyor
             * liste ustunde update işlemi veya delete işlemi yapılacak
             */
            function addSaleitemPackageItem(item) {
                var packageItem = {
                    package_id : vm.itemId,
                    qty        : 1,
                    saleitem_id: item.saleitem_id
                };

                angular.merge(packageItem, model.one());
                return Restangular.copy(packageItem).post();
            };
        }
    }
});


