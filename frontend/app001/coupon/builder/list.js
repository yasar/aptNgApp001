/**
 * Created by burak on 26.09.2016.
 */
_.merge(couponBuilder.list,{
    rowMenu   : function ($injector, vm) {
        var Menu    = $injector.get('aptMenu'),
            restOp  = $injector.get('restOperationService'),
            service = $injector.get(couponBuilder.getServiceName('service'));

        var rowMenu = Menu.Item({
            name   : 'row-menu',
            'class': 'btn-group-xs'
        });

        var menuItemEdit = Menu.Item({
            text   : 'Edit',
            icon   : 'edit',
            'class': 'btn-success',
            show   : function (item) {
                if (item.coupon_status == 'draft') {
                    return true;
                } else {
                    return false;
                }
            },
            click  : function (item) {
                service.edit(item, {popup: true, stay: true, suffix: 'manager'});

            }
        });

        var menuItemDelete = Menu.Item({
            text   : 'delete',
            icon   : 'delete',
            'class': 'btn-danger',
            click  : function (item) {
                restOp.delete({type: 'couponReward', data: item, allData: service.getRepo()});

            }
        });


        rowMenu.addChild(menuItemEdit);
        rowMenu.addChild(menuItemDelete);
        return rowMenu;
    },
    controller: function ($injector, $scope, builder) {
        var vm = this;

        /**
         * kupon kontrol ozelligi daha sonraki bir surume ertelendi.
         * eklenecek ozellik kupon taslak asamasında iken yayınlanmadan once
         * kuponun kullanılabilirliği için gerekli bilgi girişinin yapılıp yapılmadıgını kontrol edecek.
         */
        /* $scope.$watch(function () {
         return vm.data;
         }, function (newVal, oldVal) {

         if (_.isUndefined(newVal) || _.isEqual(newVal, oldVal)) {
         return;
         }
         checkValidityCoupon();
         }, true);

         function checkValidityCoupon() {
         var service = $injector.get(couponBuilder.getServiceName('service'));

         angular.forEach(vm.data, function (item) {
         service.checkValidity(item.coupon_id);
         })
         }*/
    }
});
