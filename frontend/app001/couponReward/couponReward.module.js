/*
/!**
 * Created by unal on 19.03.2016.
 *!/


var couponRewardBuilder = new aptBuilder({
    domain : 'couponReward',
    package: 'app001',
    icon   : ' icon-coins',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        moduleService    : true,
        modelService     : true
    },
    model  : {

        restize:function(item){
            aptBuilder.utils.makeInt(item,['is_subtracted_from_sale_totals','is_discounted_price_regarded','is_percentage']);
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    couponRewardBuilder.utils.makeBool(item, ['is_percentage', 'is_subtracted_from_sale_totals', 'is_discounted_price_regarded']);
                    couponRewardBuilder.utils.makeInt(item, ['reward_type_id']);
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    couponRewardBuilder.model.restize(item);
                    return item;
                }
            }
        ],
        methods            : {
            element   : [

                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: null
        }
    },
    service: {
        methods: {
            //getOverview: function (couponId) {
            //    return this.model.one(couponId).getOverview();
            //}
        }


    },
    list   : {
       /!* rowMenu: function ($injector, vm) {
            var Menu    = $injector.get('aptMenu'),
                restOp  = $injector.get('restOperationService'),
                service = $injector.get(couponRewardBuilder.getServiceName('service'));

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemDelete = Menu.Item({
                text   : 'delete',
                icon   : 'delete',
                'class': 'btn-danger',
                click  : function (item) {
                    restOp.delete({type: 'couponReward', data: item, allData: service.getRepo()});

                }
            });

            rowMenu.addChild(menuItemDelete);
            return rowMenu;
        },*!/
    },
    form   : {
        title:'Reward',
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var aptUtils      = $injector.get('aptUtils');
            var vm            = $scope[builder.getControllerAsName('form')];


            /!*if (_.get(vm.form.data,'__is_incomplete') == 1) {
             vm.form.data.coupon_id = $routeSegment.$routeParams.id;
             }*!/

            vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);


            vm.showDefault = {
                gift_voucher : false,
                free_saleitem: false,
                point        : false,
                discount     : false
            };

            vm.show = {};

            var resetShow = function () {
                angular.extend(vm.show, vm.showDefault);
            };

            var updateShow = function (target_name) {
                switch (target_name) {

                    case 'gift_voucher':
                        vm.show.gift_voucher = !vm.show.gift_voucher;
                        break;
                    case 'free_saleitem':
                        vm.show.free_saleitem = !vm.show.free_saleitem;
                        break;
                    case 'point':
                        vm.show.point = !vm.show.point;
                        break;

                    case 'discount':
                        vm.show.discount = !vm.show.discount;
                        break;

                }
            };

            vm.changeTarget = function (target) {

                if (!target) {
                    return;
                }

                resetShow();
                updateShow(target.name);
            };


        }
    }
});

couponRewardBuilder.generate();
*/
