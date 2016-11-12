/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponSubjectBuilder.form,{
    title         : 'Subject',
    controller    : function ($injector, $scope, builder) {
        var $routeSegment = $injector.get('$routeSegment');
        var aptUtils      = $injector.get('aptUtils');
        var vm            = $scope[builder.getControllerAsName('form')];

        vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);

        //
        //if (_.get(vm.form.data, '__is_incomplete') == 1) {
        //    vm.form.data.coupon_id = $routeSegment.$routeParams.id;
        //}


        vm.showDefault = {
            saleitem      : false,
            saleitem_group: false,
            brand         : false
        };

        vm.show = {};

        var resetShow = function () {
            angular.extend(vm.show, vm.showDefault);
        };

        var updateShow = function (target_name) {

            switch (target_name) {

                case 'saleitem':
                    vm.show.saleitem = true;
                    break;
                case 'saleitem_group':
                    vm.show.saleitem_group = true;
                    break;
                case 'brand':
                    vm.show.brand = true;
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

    },
    onBeforeSubmit: function ($injector, $scope, formObj) {
        var vm       = $scope.vmCouponSubjectForm;
        var $q       = $injector.get('$q');
        var $timeout = $injector.get('$timeout');
        var defer    = $q.defer();

        $timeout(function () {

            if (vm.selectedType.name == 'saleitem') {
                formObj.data.saleitem_group_id = null;
            }

            defer.resolve(true);
        });

        return defer.promise;

    }
})