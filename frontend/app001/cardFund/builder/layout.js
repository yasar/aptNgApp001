_.merge(cardFundBuilder.layout,{
    templConfig: {
        showSidebarLeft : true,
        showSidebarRight: false,
    },
    controller : function ($injector, $scope, builder) {
        var Templ          = $injector.get('aptTempl');
        var gettextCatalog = $injector.get('gettextCatalog');

        if (Templ.config.showSidebarLeft) {
            Templ.setSlotItem('sidebarLeft', 'filter', {
                isCollapsable: true,
                isCollapsed  : false,
                showTitle    : true,
                title        : gettextCatalog.getString('Filter'),
                body         : '<div apt-card-fund-filter></div>',
                _scopeId     : $scope.$id
            });
        }
    }
});
