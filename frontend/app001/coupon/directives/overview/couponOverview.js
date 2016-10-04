/**
 * Created by unal on 19.03.2016.
 */


(function () {
    var domain        = 'coupon',
        path          = 'app001/' + domain + '/directives/overview',
        tpl           = 'overview',
        directiveName = _.upperFirst(domain) + 'Overview';

    angular
        .module('apt.app001.' + domain)
        .directive('apt' + directiveName, fn);

    function fn() {
        return {
            restrict        : 'A',
            scope           : {},
            controller      : controllerFn,
            controllerAs    : 'vm' + directiveName,
            templateUrl     : path + '/' + tpl + '.tpl.html',
            bindToController: {
                couponId: '='
            }
        }
    }

    controllerFn.$inject = ['CouponService'];

    function controllerFn(CouponService) {

        var vm = this;

        CouponService.getOverview(vm.couponId).then(function (data) {
            vm.coupon = data;
        })

    }

})();