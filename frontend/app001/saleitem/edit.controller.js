/**
 * Created by murat on 24.12.2015.
 */
(function () {
    return;
    var builder = saleitemBuilder;
    angular
        .module(builder.getModuleName())
        .controller('SaleitemEditCtrl', fn);

    fn.$inject = ['$scope', '$state', 'aptTempl', 'aptMenu', 'aptUtils'];

    function fn($scope, $state, Templ, Menu, aptUtils) {
        // console.log('saleItem: edit.controller');
        //
        // Templ.reset();
        var vm = this;

        vm.saleitem_id = $state.params.id;

        // Templ.config.showHeader       = true;
        // Templ.config.showBreadcrumb   = true;
        // Templ.config.showSidebarLeft  = true;
        // Templ.config.showSidebarRight = false;

        // Templ.setSlotItem('sidebarLeft', 'message_list', {
        //     title   : '{{"Action" | translate }} ',
        //     body    : '<h5>Deneme</h5>',
        //     _scopeId: $scope.$id
        // });

        // setBreadcrumb();
        //
        // function setBreadcrumb() {
        //
        //     var menuSections          = Menu.Item();
        //     $scope.insideMenuSections = menuSections;
        //     menuSections
        //         .addChild({
        //             text : 'Price Manager',
        //             icon : 'icon-dots',
        //             auth : ['access_saleitem_menu'],
        //             click: function () {
        //                 aptUtils.goto({
        //                     segment: {
        //                         name  : 'main.app001.saleitem.price',
        //                         params: {id: $routeSegment.$routeParams.id}
        //                     }
        //                 });
        //             }
        //         })
        //         .addChild({
        //             text : 'Package Manager',
        //             icon : 'icon-location4',
        //             auth : ['access_saleitem_menu'],
        //             click: function () {
        //                 aptUtils.goto({
        //                     segment: {
        //                         name  : 'main.app001.saleitem.package',
        //                         params: {id: $routeSegment.$routeParams.id}
        //                     }
        //                 });
        //             }
        //         })
        //
        //     Templ.setSlotItem('breadcrumbElements', 'sale_item', {
        //         title   : '{{"Sections" | translate }} ',
        //         body    : '<div apt-menu-builder menu-type="breadcrumb-menu" ng-model="insideMenuSections"></div>',
        //         _scopeId: $scope.$id
        //     });
        // }
    }
})();