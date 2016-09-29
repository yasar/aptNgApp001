/**
 * Created by engin on 26.09.2016.
 */
_.merge(dashboardBuilder.service,{
    init   : function ($injector) {
        /**
         * will hold creator functions to be called when dashboard is initialized
         * @type {Array}
         */
        this.vars.widgetCreators = [];
        /**
         * will hold the compiled widget html/directives
         * @type {Array}
         */
        this.vars.widgets = [];
    },
    methods: {
        addWidget            : function (widget) {
            this.vars.widgets.push(widget);
        },
        getWidgets           : function () {
            return this.vars.widgets;
        },
        initCalendar         : function ($scope) {
            var NotifyingService         = this.$injector.get('NotifyingService');
            var DashboardCalendarService = this.$injector.get('DashboardCalendarService');

            // $scope.calendarName = 'dashboard_calendar_' + $scope.$id;

            NotifyingService.subscribe($scope, 'calendar:ready', function (event, calendarObj) {
                DashboardCalendarService.cleanEventSources();
                NotifyingService.notify('dashboard-calendar:ready', {
                    calendarObj    : calendarObj,
                    calendarService: DashboardCalendarService
                });
            }, null, true);

            NotifyingService.subscribe($scope, 'calendar:render', function (event, calendarObj) {
                //DashboardCalendarService.fillEventSourcesEvents(calendarObj);
                DashboardCalendarService.pullEvents(calendarObj);
            });
        },
        initWidgets          : function ($scope) {
            var creators = this.vars.widgetCreators;
            var _this    = this;
            _.forEach(creators, function (creator) {
                creator.call(_this, $scope.$new(), _this.$injector);
                // creator($scope, _this.$injector, _this.serviceObj);
            });
        },
        registerWidgetCreator: function (widgetCreator) {
            this.vars.widgetCreators.push(widgetCreator);
        },
        _destroy             : function ($scope) {
            /**
             * keep widgetCreators intact, that's our cache.
             * just empty the generated widgets, so that
             * we wont re-generate them
             */
            this.vars.widgets.length = 0;
        }
    }
})