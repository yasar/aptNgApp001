/**
 * Created by yasar on 05.05.2016.
 */

(function () {
    angular.module('apt.app001.application').controller('ApplicationEditCtrl', fn);

    fn.$inject = ['$scope', '$routeSegment'];
    function fn($scope, $routeSegment) {
        $scope.app_id   = $routeSegment.$routeParams.app_id;
        $scope.app_name = $routeSegment.$routeParams.app_name;
        $scope.row_nr   = $routeSegment.$routeParams.row_nr;
    }
})();