/**
 * Created by yasar on 05.05.2016.
 */

(function () {

    angular.module('apt.app001.application').controller('ApplicationNewCtrl', fn);

    fn.$inject = ['$scope', 'aptTempl', 'aptMenu', '$routeSegment', 'gettextCatalog'];
    function fn($scope, Templ, Menu, $routeSegment, gettextCatalog) {
        var builder = applicationBuilder;
        Templ.reset(true);
        Templ.page.title = gettextCatalog.getString(builder.title);
        Templ.page.icon  = builder.icon;

        $scope.app_id   = $routeSegment.$routeParams.app_id;
        $scope.app_name = $routeSegment.$routeParams.app_name;

        Menu.get('moduleMenu').clear().addChild({
            text: 'asd',
            icon: 'fa fa-times fa-2x',
            href: $routeSegment.getSegmentUrl('main.app001.application.current'),
            auth2: ['read_epilation_module']
        });
    }

})();