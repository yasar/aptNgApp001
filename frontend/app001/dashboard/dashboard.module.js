/*
var dashboardBuilder = new aptBuilder({
    domain      : 'dashboard',
    dependencies: ['apt.calendar', 'apt.atomFeeds', 'aptAtomFeedsTemplates'],
    package     : 'app001',
    title       : 'Dashboard',
    icon        : 'icon-home2',
    menu        : {
        order: 0
    },
    create      : {
        listDirective    : false,
        formDirective    : false,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : false,
        layoutController : true
    },

    service: {
        init   : function ($injector) {
            /!**
             * will hold creator functions to be called when dashboard is initialized
             * @type {Array}
             *!/
            this.vars.widgetCreators = [];
            /!**
             * will hold the compiled widget html/directives
             * @type {Array}
             *!/
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
                /!**
                 * keep widgetCreators intact, that's our cache.
                 * just empty the generated widgets, so that
                 * we wont re-generate them
                 *!/
                this.vars.widgets.length = 0;
            }
        }
    },

    layout: {
        template  : '<div data-apt-dashboard></div>',
        controller: function ($injector, $scope, builder) {

            var aptMenu  = $injector.get('aptMenu');
            var aptTempl = $injector.get('aptTempl');
            var service  = $injector.get(dashboardBuilder.getServiceName('service'));

            aptMenu.get('moduleMenu').clear();
            aptTempl.resetWithBuilder(dashboardBuilder);
            // aptTempl.page.title = gettextCatalog.getString(dashboardBuilder.title);
            // aptTempl.page.icon = dashboardBuilder.icon;

            aptTempl.config.fillContent       = false;
            aptTempl.config.transparentHeader = false;
            aptTempl.config.showHeader        = false;
            aptTempl.config.showBreadcrumb    = false;
            aptTempl.config.showFooter        = true;
            aptTempl.config.showSidebarLeft   = false;
            aptTempl.config.showSidebarRight  = false;
        }
    }
});

dashboardBuilder.generate();*/
