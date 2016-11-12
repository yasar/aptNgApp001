/**
 * Created by yasar on 05.05.2016.
 */

(function () {
    angular.module('apt.app001.application').controller('ApplicationListCtrl', fn);
    fn.$inject = ['$scope', 'aptTempl', 'aptMenu', '$timeout', '$routeSegment', 'gettextCatalog'];
    function fn($scope, Templ, Menu, $timeout, $routeSegment, gettextCatalog) {
        var builder = applicationBuilder;
        Templ.reset(true);
        Templ.page.title       = gettextCatalog.getString(builder.title);;
        Templ.page.icon        = builder.icon;

        Menu.get('moduleMenu').clear().addChild({
            text : gettextCatalog.getString('Add New'),
            class: 'btn btn-primary btn-sm',
            icon : 'fa fa-user-plus fa-2',
            href : $routeSegment.getSegmentUrl('main.app001.application.current.new'),
            auth : ['create_application_module'],
            click: function () {
                return true;
            }
        });

        $scope.app_id   = $routeSegment.$routeParams.app_id;
        $scope.app_name = $routeSegment.$routeParams.app_name;

    }
})();