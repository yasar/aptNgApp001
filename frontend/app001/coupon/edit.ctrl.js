/**
 * Created by unal on 19.03.2016.
 */


(function () {
    angular.module('apt.app001.coupon').controller('CouponEditCtrl', fn);

    fn.$inject = ['aptTempl', 'aptMenu', '$routeSegment', '$scope',
        'gettextCatalog', 'NotifyingService', '$timeout', '$location', 'restOperationService'];
    function fn(Templ, Menu, $routeSegment, $scope,
                gettextCatalog, NotifyingService, $timeout, $location, restOp) {


        $scope.couponId = $routeSegment.$routeParams.id;

        Menu.get('moduleMenu').clear();

        var menuCouponDescription = Menu.Item({
            text: 'Coupon Action',
            icon: 'glyphicon glyphicon-tasks'
        });

        var menuCondition  = Menu.Item({
            text : 'Add Condition',
            icon : 'icon-check',
            click: function () {
                restOp.addNew({type: 'couponCondition', add_before: true, popup: true});
            }
        });
        var menuTarget = Menu.Item({
            text : 'Add Target',
            icon : 'glyphicon  glyphicon-unchecked',
            click: function () {
                restOp.addNew({type: 'couponTarget', add_before: true, popup: true});
            }
        });
        var menuSubject       = Menu.Item({
            text : 'Add Subject',
            icon : 'icon-envelop5',
            click: function () {
                restOp.addNew({type: 'couponSubject', add_before: true, popup: true});
            }
        });

        var menuRequirement       = Menu.Item({
            text : 'Add Requirement',
            icon : 'icon-envelop5',
            click: function () {
                restOp.addNew({type: 'couponRequirement', add_before: true, popup: true});
            }
        });
        var menuReward       = Menu.Item({
            text : 'Add Reward',
            icon : 'icon-envelop5',
            click: function () {
                restOp.addNew({type: 'couponReward', add_before: true, popup: true});
            }
        });

        Menu.get('moduleMenu').addChild(menuCouponDescription);
        menuCouponDescription.addChild(menuSubject);
        menuCouponDescription.addChild(menuCondition);
        menuCouponDescription.addChild(menuTarget);
        menuCouponDescription.addChild(menuRequirement);
        menuCouponDescription.addChild(menuReward);


    }

})();