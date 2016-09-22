/**
 * Created by unal on 19.03.2016.
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
    model  : {
        normalize           : function (item) {
            aptBuilder.utils.makeTime(item, ['start_time', 'end_time']);
            if (item.start_date && item.end_date) {
                aptBuilder.utils.makeDate(item, ['start_date', 'end_date']);
                item.date_range = {
                    startDate: item.start_date,
                    endDate  : item.end_date
                }
            }
        },
        restsize            : function (item) {

            if (item.date_range) {
                aptBuilder.utils.makeString(item.date_range, ['startDate']);
                aptBuilder.utils.makeString(item.date_range, ['endDate']);
                item.start_date = item.date_range.startDate;
                item.end_date   = item.date_range.endDate;
            }

            aptBuilder.utils.formatTimeForDb(item, ['start_time', 'end_time']);
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {

                    couponConditionBuilder.model.normalize(item);
                    couponConditionBuilder.utils.makeInt(item, ['condition_type_id', 'event_type_id', 'shopping_channel_type_id']);
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    couponConditionBuilder.model.restsize(item);
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: null
        }
    },
    service: {
        methods: {
            //getOverview: function (couponId) {
            //    return this.model.one(couponId).getOverview();
            //}
        }


    },
    form   : {
        title     : 'Condition',
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

couponConditionBuilder.generate();
