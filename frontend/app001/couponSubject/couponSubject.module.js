/**
 * Created by unal on 19.03.2016.
 */


var couponSubjectBuilder = new aptBuilder({
    domain : 'couponSubject',
    package: 'app001',
    icon   : 'icon-file-check',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {

                    couponSubjectBuilder.utils.makeInt(item,
                        ['type_id', 'target_scope_type_id',
                            'saleitem_group_id', 'brand_id', 'saleitem_id','coupon_subject_id']);

                    var saleitemName  = item.saleitem_name ? ' - '+item.saleitem_name : ' ';
                    var saleitemGroup = item.saleitemgroup ? ' - '+item.saleitemgroup : ' ';

                    item._selectorTitle = _.upperFirst(item.type) + saleitemName +  saleitemGroup;

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
      /*  rowMenu: function ($injector, vm) {
            var Menu    = $injector.get('aptMenu'),
                restOp  = $injector.get('restOperationService'),
                service = $injector.get(couponSubjectBuilder.getServiceName('service'));

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemDelete = Menu.Item({
                text   : 'delete',
                icon   : 'delete',
                'class': 'btn-danger',
                click  : function (item) {
                    restOp.delete({type: 'couponSubject', data: item, allData: service.getRepo()});

                }
            });

            rowMenu.addChild(menuItemDelete);
            return rowMenu;
        },*/
    },
    form   : {
        title         : 'Subject',
        controller    : function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var aptUtils      = $injector.get('aptUtils');
            var vm            = $scope[builder.getControllerAsName('form')];

            vm.form.data.coupon_id = aptUtils.getUrlSearchParamValue('id', vm.form.data.coupon_id);

            //
            //if (_.get(vm.form.data, '__is_incomplete') == 1) {
            //    vm.form.data.coupon_id = $routeSegment.$routeParams.id;
            //}


            vm.showDefault = {
                saleitem      : false,
                saleitem_group: false,
                brand         : false
            };

            vm.show = {};

            var resetShow = function () {
                angular.extend(vm.show, vm.showDefault);
            };

            var updateShow = function (target_name) {

                switch (target_name) {

                    case 'saleitem':
                        vm.show.saleitem = true;
                        break;
                    case 'saleitem_group':
                        vm.show.saleitem_group = true;
                        break;
                    case 'brand':
                        vm.show.brand = true;
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

        },
        onBeforeSubmit: function ($injector, $scope, formObj) {
            var vm       = $scope.vmCouponSubjectForm;
            var $q       = $injector.get('$q');
            var $timeout = $injector.get('$timeout');
            var defer    = $q.defer();

            $timeout(function () {

                if (vm.selectedType.name == 'saleitem') {
                    formObj.data.saleitem_group_id = null;
                }

                defer.resolve(true);
            });

            return defer.promise;

        }
    }
});

couponSubjectBuilder.generate();
