(function () {
    var builder = dashboardBuilder;
    var name    = 'dashboard';

    angular.module(builder.getModuleName())
    /**
     * dont name this, this will turnout to be DashboardDirective,
     * otherwise it would be DashboardCustomDirective
     */
        .directive(builder.getDirectiveName(''), Directive);

    function Directive() {
        return {
            restrict        : 'EA', // ACME
            scope           : true,
            templateUrl     : builder.getPath(name) + '/' + name + '.tpl.html',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(),
            bindToController: {}
        };
    }

    Controller.$inject = ['$scope', '$injector'];
    function Controller($scope, $injector) {
        var service                  = $injector.get(dashboardBuilder.getServiceName('service'));
        var UserService              = $injector.get('UserService');
        var DashboardCalendarService = $injector.get('DashboardCalendarService');
        var vm                       = this;
        vm.User                      = UserService.getAuthUser();
        vm.widgets                   = service.getWidgets();

        service.initWidgets($scope);


        initDashboardCalendar();

        function initDashboardCalendar() {
            service.initCalendar($scope);
            vm.calendarName   = 'dashboard_calendar_' + $scope.$id;
            vm.calendarConfig = {
                dayClick          : false,
                eventClick        : true,
                eventResize       : false,
                eventDrop         : false,
                addEvent          : false,
                timeDuration      : false,
                eventStartEditable: false,
                changeView        : false,
                notifyReady       : true
            };

            DashboardCalendarService.setCalendarName(vm.calendarName);
            vm.eventSources = DashboardCalendarService.getEventSources();
        }
    }
})();