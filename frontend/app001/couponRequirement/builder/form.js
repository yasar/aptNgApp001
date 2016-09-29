/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponRequirementBuilder.form,{
    title:'Requirement',
    controller: function ($injector, $scope, builder) {
        var $routeSegment = $injector.get('$routeSegment');
        var aptUtils = $injector.get('aptUtils');
        var vm            = $scope[builder.getControllerAsName('form')];

        vm.form.data.coupon_id=aptUtils.getUrlSearchParamValue('id',vm.form.data.coupon_id);

        //if (_.get(vm.form.data,'__is_incomplete') == 1) {
        //    vm.form.data.coupon_id = $routeSegment.$routeParams.id;
        //}

    }
})