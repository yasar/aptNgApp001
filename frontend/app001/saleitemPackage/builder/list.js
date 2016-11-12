/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPackageBuilder.list,{
    controller: function ($injector, $scope, builder) {
        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));

        vm.save   = saveFn;
        vm.delete = deleteFn;

        function saveFn(item) {
            service.update(item);
        }

        function deleteFn(item) {
            service.delete(item);
        }
    }
})