/**
 * Created by burak on 26.09.2016.
 */
_.merge(couponBuilder.form, {
    title       : 'Coupon',
    showHelp    : true,
    beforeCreate: function ($injector, $scope, builder) {
        var vm = this;
        //vm.stay = true;
    }
});
