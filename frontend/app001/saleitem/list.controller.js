/**
 * Created by murat on 24.12.2015.
 */


(function () {
    var builder = saleitemBuilder;
    angular
        .module(builder.getModuleName())
        .controller(builder.getControllerName('list'), fn);

    fn.$inject = ['$scope', 'aptTempl', 'aptMenu', '$routeSegment', 'gettextCatalog', 'restOperationService'];

    function fn($scope, Templ, Menu, $routeSegment, gettextCatalog, restOp) {
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


    }
})();