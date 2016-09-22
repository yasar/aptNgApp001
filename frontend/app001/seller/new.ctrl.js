/**
 * Created by unal on 23.03.2016.
 */


(function () {
    angular.module('apt.app001.seller').controller('SellerNewCtrl', Fn);

    Fn.$inject = ['$scope', '$rootScope', 'aptUtils','aptMenu','$routeSegment','aptTempl'];

    function Fn($scope, $rootScope, aptUtils,Menu,$routeSegment,Templ) {

        var listener1 = $scope.$on('$routeChangeSuccess', function (event, next, current) {
            $scope.sellerType = aptUtils.getUrlSearchParamValue('sellerType');
            init();
        });

        $scope.$on('$destroy', function (event, next, current) {
            listener1();
        });

        function init() {
            if (!$scope.sellerType) {
                $scope.sellerType = 'person';
            }
            var builder      = sellerBuilder;
            Templ.page.title = gettextCatalog.getString(builder.title) + ' / ' + _.upperCase($scope.sellerType);
            Templ.page.icon  = builder.icon;
        }

        Menu.get('moduleMenu').clear()
            .addChild({
                text : 'Return List',
                icon : ' icon-strikethrough3',
                class: 'btn bg-grey-400 btn-xs',
                //href : $routeSegment.getSegmentUrl('main.app001.seller.list'),
                auth : ['create_seller_module'],
                click: function () {
                    aptUtils.goto({segment: 'main.app001.seller.list'});
                }
            })

    }
})();