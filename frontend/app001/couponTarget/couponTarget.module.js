/*
*
 * Created by unal on 19.03.2016.


var couponTargetBuilder = new aptBuilder({
    domain : 'couponTarget',
    package: 'app001',
    icon   : 'icon-target2',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {

                    couponTargetBuilder.utils.makeInt(item, ['coupon_id', 'type_id']);
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
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
     /!*   rowMenu: function ($injector, vm) {
            var Menu    = $injector.get('aptMenu'),
                restOp  = $injector.get('restOperationService'),
                service = $injector.get(couponTargetBuilder.getServiceName('service'));

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemDelete = Menu.Item({
                text   : 'delete',
                icon   : 'delete',
                'class': 'btn-danger',
                click  : function (item) {
                    restOp.delete({type: 'couponTarget', data: item, allData: service.getRepo()});

                }
            });

            rowMenu.addChild(menuItemDelete);
            return rowMenu;
        },*!/
    },
    form   : {
        title:'Target',
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var aptUtils      = $injector.get('aptUtils');
            var vm            = $scope[builder.getControllerAsName('form')];

            vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);


            /!*if (_.get(vm.form.data,'__is_incomplete') == 1) {
             vm.form.data.coupon_id = $routeSegment.$routeParams.id;
             }*!/


            vm.showDefault = {
                staff_group : false,
                client_group: false,
                card_type   : false,
            };

            vm.show = {};

            var resetShow = function () {
                angular.extend(vm.show, vm.showDefault);
            };

            var updateShow = function (target_name) {

                switch (target_name) {

                    case 'staff_group':
                        vm.show.staff_group = !vm.show.staff_group;
                        /!**
                         * target degiştigi zaman bi onceki secilmis targetin id sini nullıyoruz.
                         * boylece data'yı update için gonderirken sadece secilmiş target'ın id sini yollanıs oacagız.
                         * target gorup tablosunda sadece bir tane targeti id sini kayıt edebiliyoruz
                         * @type {null}
                         *!/
                        vm.form.data.client_group_id = null;
                        vm.form.data.card_type_id = null;
                        break;
                    case 'client_group':
                        vm.show.client_group        = !vm.show.client_group;
                        vm.form.data.staff_group_id = null;
                        vm.form.data.card_type_id   = null;
                        break;
                    case 'card_type':
                        vm.show.card_type            = !vm.show.card_type;
                        vm.form.data.client_group_id = null;
                        vm.form.data.staff_group_id  = null;
                        break;
                    default:
                        vm.form.data.client_group_id = null;
                        vm.form.data.staff_group_id  = null;
                        vm.form.data.card_type_id   = null;
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

couponTargetBuilder.generate();
*/
