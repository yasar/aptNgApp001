/**
 * Created by yasar on 26.09.2016.
 */
_.merge(saleitemBuilder.routeConfig, {
    list: {
        template  : '<apt-panel><div data-apt-saleitem-list edit-conf="vmSaleitemList.editConf" add-new-conf="vmSaleitemList.addNewConf"></div></apt-panel>',
        controller: ['$scope', 'aptTempl', 'aptMenu', '$routeSegment', 'gettextCatalog', 'restOperationService',
            function ($scope, Templ, Menu, $routeSegment, gettextCatalog, restOp) {
                var vm = this;
                // Templ.reset(true);
                // Templ.page.title              = gettextCatalog.getString(builder.title);
                // Templ.page.icon  = builder.icon;
                // Templ.config.breadcrumb       = false;
                // Templ.config.fillContent        = true;
                // Templ.config.showSidebarLeft  = true;
                // Templ.config.showSidebarRight = false;


                vm.addNewConf = {
                    suffix: 'manager'
                };

                vm.editConf = {
                    suffix: 'manager',
                    popup : true,
                    stay  : true
                };


            }]
    }
});