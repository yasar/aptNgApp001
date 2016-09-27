/*
/!**
 * Created by unal on 19.03.2016.
 *!/


var couponRequirementBuilder = new aptBuilder({
    domain : 'couponRequirement',
    package: 'app001',
    icon   : ' icon-drawer3',
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

                    couponRequirementBuilder.utils.makeInt(item,['requirement_type_id','payment_type_id','coupon_subject_id']);
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
       /!* rowMenu: function ($injector, vm) {
            var Menu    = $injector.get('aptMenu'),
                restOp  = $injector.get('restOperationService'),
                service = $injector.get(couponRequirementBuilder.getServiceName('service'));

            var rowMenu = Menu.Item({
                name: 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemDelete = Menu.Item({
                text: 'delete',
                icon: 'delete',
                'class': 'btn-danger',
                click: function (item) {
                    restOp.delete({type: 'couponRequirement', data: item, allData: service.getRepo()});

                }
            });

            rowMenu.addChild(menuItemDelete);
            return rowMenu;
        },*!/
    },
    form   : {
        title:'Requirement',
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var aptUtils = $injector.get('aptUtils');
            var vm            = $scope[builder.getControllerAsName('form')];

            vm.form.data.coupon_id=aptUtils.getUrlSearchParamValue('id',vm.form.data.coupon_id);

            //if (_.get(vm.form.data,'__is_incomplete') == 1) {
            //    vm.form.data.coupon_id = $routeSegment.$routeParams.id;
            //}

        }
    }
});

couponRequirementBuilder.generate();
*/
