/**
 * Created by engin on 26.09.2016.
 */
_.merge(dashboardBuilder.layout,{
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
})