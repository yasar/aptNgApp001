/**
 * Created by unal on 19.03.2016.
 */


(function () {
    return;
    angular.module('apt.app001.coupon').controller('CouponLayoutCtrl', fn);

    fn.$inject = ['aptTempl', 'aptMenu', '$routeSegment', '$scope',
        'gettextCatalog', 'restOperationService'];
    function fn(Templ, Menu, $routeSegment, $scope,
                gettextCatalog, restOp) {

        var builder = couponBuilder;

        init();
        function init() {
            //$scope.insideMenu = Menu.get('moduleMenu');
            //$scope.insideMenu.clear().addChild({
            //    text : 'New Coupon',
            //    icon : 'fa fa-plus-circle fa-fw',
            //    class: 'btn bnt-info btn-xs',
            //    auth : ['create_coupon_module'],
            //    click: function () {
            //        restOp.addNew({type: 'coupon', add_before: true, popup: true});
            //    }
            //
            //});


            initTempl();

            function initTempl() {
                Templ.reset(true);
                Templ.config.fillContent         = true;
                Templ.config.transparentHeader = false;
                Templ.config.showHeader        = true;
                Templ.config.showBreadcrumb    = true;
                Templ.config.showFooter        = true;
                Templ.config.showSidebarLeft   = true;
                Templ.config.showSidebarRight  = false;

                Templ.page.title       = gettextCatalog.getString(builder.title);
                Templ.page.icon = builder.icon;


                Templ.setSlotRouteSegment();

                initSidebarLeft();

                function initSidebarLeft() {
                    Templ.setSlotItem('sidebarLeft', 'Coupon List', {
                        title        : gettextCatalog.getString('Coupon List'),
                        body         : '<div data-apt-coupon-list data-view-type="sidebar"></div>',
                        isCollapsed  : false,
                        isCollapsable: true,
                        showTitle    : false,
                        _scopeId     : $scope.$id
                    }, 'main.app001.coupon');


                }
            }

        }

    }

})();