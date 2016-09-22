/**
 * Created by abdullah on 12.01.2016.
 */


(function () {


    angular.module('apt.app001.seller').controller('SellerEditCtrl', fn);

    fn.$inject = ['$scope'];

    function fn($scope) {

        $scope.sellerId = $routeSegment.$routeParams.id;

    };


})();
