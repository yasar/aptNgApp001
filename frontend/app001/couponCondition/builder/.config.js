/**
 * Created by engin on 26.09.2016.
 */
var couponConditionBuilder = new aptBuilder({
    domain : 'couponCondition',
    package: 'app001',
    icon   : ' icon-archive',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        moduleService    : true,
        modelService     : true
    },
    form   : {
        title     : 'Condition',
        showHelp  : true,
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var aptUtils      = $injector.get('aptUtils');
            var vm            = $scope[builder.getControllerAsName('form')];
            //if (angular.isDefined(vm.form.data.__is_incomplete)) {

            vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);

            //if (_.get(vm.form.data, '__is_incomplete') == 1) {
            //    vm.form.data.coupon_id = $routeSegment.$routeParams.id;
            //}


            vm.showDefault = {
                event             : false,
                nth               : false,
                date_interval     : false,
                time_interval     : false,
                timeFrame_interval: false
            };

            vm.vars = {
                show: {}
            };

            vm.date_range = {
                startDate: null,
                endDate  : null
            };

            var updateShow = function (type_name) {
                switch (type_name) {

                    case 'special_event':
                        vm.vars.show.event = true;
                        vm.vars.show.nth   = true;
                        break;
                    case 'timeframe':
                        vm.vars.show.event              = true;
                        vm.vars.show.timeFrame_interval = true;
                        break;
                    case 'date_interval':
                        vm.vars.show.date_interval = true;
                        break;

                }
            };

            var resetShow = function () {
                angular.extend(vm.vars.show, vm.showDefault);
            };

            vm.changeTarget = function (target) {

                if (!target) {
                    return;
                }

                resetShow();
                updateShow(target.name);
            };

        }
    }
});

