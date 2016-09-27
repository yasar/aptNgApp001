/**
 * Created by unal on 23.03.2016.
 */


(function () {
    var builder = clientBuilder;
    var name    = 'new';
    angular.module(builder.getModuleName()).controller(builder.getControllerName(name), Controller);

    Controller.$inject = ['$scope', '$rootScope', 'aptUtils', 'aptMenu', '$routeSegment', 'aptTempl'];

    function Controller($scope, $rootScope, aptUtils, Menu, $routeSegment, Templ) {

        var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
            $scope.clientType = aptUtils.getUrlSearchParamValue('clientType');
            init();
        });

        $scope.$on('$destroy', function (event, next, current) {
            listener1();
        });

        Menu.get('moduleMenu').clear()
            .addChild({
                text : 'Return List',
                icon : 'icon-chess-queen',
                class: 'btn bg-grey-400 btn-xs',
                href : $routeSegment.getSegmentUrl('main.app001.client.list'),
                auth : ['create_client_module'],
                click: function () {
                    return true;
                }
            });

        function init() {
            if (!$scope.clientType) {
                $scope.clientType = 'person';
            }

            Templ.page.subTitle = _.upperCase($scope.clientType);
        }

    }
})();