/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponRewardBuilder.form,{
    title:'Reward',
    controller: function ($injector, $scope, builder) {
        var $routeSegment = $injector.get('$routeSegment');
        var aptUtils      = $injector.get('aptUtils');
        var vm            = $scope[builder.getControllerAsName('form')];


        /*if (_.get(vm.form.data,'__is_incomplete') == 1) {
         vm.form.data.coupon_id = $routeSegment.$routeParams.id;
         }*/

        vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);


        vm.showDefault = {
            gift_voucher : false,
            free_saleitem: false,
            point        : false,
            discount     : false
        };

        vm.show = {};

        var resetShow = function () {
            angular.extend(vm.show, vm.showDefault);
        };

        var updateShow = function (target_name) {
            switch (target_name) {

                case 'gift_voucher':
                    vm.show.gift_voucher = !vm.show.gift_voucher;
                    break;
                case 'free_saleitem':
                    vm.show.free_saleitem = !vm.show.free_saleitem;
                    break;
                case 'point':
                    vm.show.point = !vm.show.point;
                    break;

                case 'discount':
                    vm.show.discount = !vm.show.discount;
                    break;

            }
        };

        vm.changeTarget = function (target) {

            if (!target) {
                return;
            }

            resetShow();
            updateShow(target.name);
        };


    }
})