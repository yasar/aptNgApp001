/**
 * Created by unal on 19.03.2016.
 */


(function () {
    angular.module('apt.app001.coupon').controller('CouponViewCtrl', fn);

    fn.$inject = ['aptTempl', 'aptMenu', '$routeSegment', '$scope',
        'gettextCatalog', 'NotifyingService', '$timeout', '$location', 'aptUtils'];
    function fn(Templ, Menu, $routeSegment, $scope,
                gettextCatalog, NotifyingService, $timeout, $location, aptUtils) {


        $scope.couponId = $routeSegment.$routeParams.id;

        setBreadcrumb();

        function setBreadcrumb() {

            var menuSections          = Menu.Item();
            $scope.insideMenuSections = menuSections;
            menuSections
                .addChild({
                    text : 'Condition',
                    icon : 'icon-dots',
                    auth : ['access_coupon_menu'],
                    click: function () {
                        aptUtils.goto({
                            segment: {
                                name  : 'main.app001.coupon.condition',
                                params: {id: $routeSegment.$routeParams.id}
                            }
                        });
                    }
                })
                .addChild({
                    text : 'Target',
                    icon : 'icon-location4',
                    auth : ['access_coupon_menu'],
                    click: function () {
                        aptUtils.goto({
                            segment: {
                                name  : 'main.app001.coupon.target',
                                params: {id: $routeSegment.$routeParams.id}
                            }
                        });
                    }
                })
                .addChild({
                    text : 'Subject',
                    icon : 'icon-flag8',
                    auth : ['access_coupon_menu'],
                    click: function () {
                        aptUtils.goto({
                            segment: {
                                name  : 'main.app001.coupon.subject',
                                params: {id: $routeSegment.$routeParams.id}
                            }
                        });
                    }
                })
                .addChild({
                    text : 'Requirement',
                    icon : 'glyphicon glyphicon-bookmark',
                    auth : ['access_coupon_menu'],
                    click: function () {
                        aptUtils.goto({
                            segment: {
                                name  : 'main.app001.coupon.requirement',
                                params: {id: $routeSegment.$routeParams.id}
                            }
                        });
                    }
                })
                .addChild({
                    text : 'Reward',
                    icon : 'glyphicon  glyphicon-dashboard',
                    auth : ['access_coupon_menu'],
                    click: function () {
                        aptUtils.goto({
                            segment: {
                                name  : 'main.app001.coupon.reward',
                                params: {id: $routeSegment.$routeParams.id}
                            }
                        });
                    }
                });

            Templ.setSlotItem('breadcrumbElements', 'Coupon', {
                title   : '{{"Sections" | translate }} ',
                body    : '<div apt-menu-builder menu-type="breadcrumb-menu" ng-model="insideMenuSections"></div>',
                _scopeId: $scope.$id
            });
        }

    }

})();