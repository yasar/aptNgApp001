/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponTargetBuilder.form, {
    title     : 'Target',
    showHelp  : true,
    controller: function ($injector, $scope, builder) {
        // var $routeSegment = $injector.get('$routeSegment');
        var aptUtils      = $injector.get('aptUtils');
        var vm            = $scope[builder.getControllerAsName('form')];

        vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);


        /*if (_.get(vm.form.data,'__is_incomplete') == 1) {
         vm.form.data.coupon_id = $routeSegment.$routeParams.id;
         }*/


        vm.showDefault = {
            staff_group : false,
            client_group: false,
            card_type   : false,
        };

        vm.show = {};

        var resetShow = function () {
            angular.extend(vm.show, vm.showDefault);
        };

        var updateShow = function (target_name) {

            switch (target_name) {

                case 'staff_group':
                    vm.show.staff_group = !vm.show.staff_group;
                    /**
                     * target degiştigi zaman bi onceki secilmis targetin id sini nullıyoruz.
                     * boylece data'yı update için gonderirken sadece secilmiş target'ın id sini yollanıs oacagız.
                     * target gorup tablosunda sadece bir tane targeti id sini kayıt edebiliyoruz
                     * @type {null}
                     */
                    vm.form.data.client_group_id = null;
                    vm.form.data.card_type_id = null;
                    break;
                case 'client_group':
                    vm.show.client_group        = !vm.show.client_group;
                    vm.form.data.staff_group_id = null;
                    vm.form.data.card_type_id   = null;
                    break;
                case 'card_type':
                    vm.show.card_type            = !vm.show.card_type;
                    vm.form.data.client_group_id = null;
                    vm.form.data.staff_group_id  = null;
                    break;
                default:
                    vm.form.data.client_group_id = null;
                    vm.form.data.staff_group_id  = null;
                    vm.form.data.card_type_id    = null;
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