/*
/!**
 * Created by yasar on 21.05.2016.
 *!/

var priceBuilder = new aptBuilder({
    domain : 'price',
    title  : 'Price',
    package: 'app001',
    icon   : 'icon-cash2',
    menu   : false,
    create : {
        listDirective    : false,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : true,
        layoutController : false
    },
    model  : {
        normalize           : function (item) {
            aptBuilder.utils.makeInt(item, ['currency_id', 'enterprise_id', 'price_id', 'tax_id']);
            aptBuilder.utils.makeNumber(item, ['base_price', 'price', 'tax_amount', 'taxed_price', 'tax_percentage',
                'currency_rate', 'discount_amount', 'discount_percentage']);
            aptBuilder.utils.makeBool(item, ['is_tax_included', 'uses_enterprise_id', '__is_incomplete']);

            item.discount_type = item.discount_type || null;
            if (item.discount_percentage && !item.discount_amount) {
                item.discount_type = 'percentage';
            }
            else if (!item.discount_percentage && item.discount_amount) {
                item.discount_type = 'amount';
            }

            /!**
             * check to see what is using this!!
             *!/
            aptBuilder.utils.makeDate(item, ['send_on']);
        },
        restize             : function (item) {
        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item, what, url, $injector) {
                    priceBuilder.model.normalize(item);
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
                {name: 'getTemplateAndFields', httpMethod: 'get', route: 'getTemplateAndFields'},
                // {name: 'getReport', httpMethod: 'get', route: 'getReport'}
            ],
            collection: [
                {name: 'getSections', httpMethod: 'get', route: 'getSections'}
            ]
        }
    },
    service: {
        //edit   : {
        //    before: function ($injector, data, popup) {
        //        // var restOp = $injector.get('restOperationService');
        //        // restOp.edit({
        //        //     type  : priceBuilder.domain,
        //        //     suffix: 'manager',
        //        //     data  : data,
        //        //     popup : popup
        //        // });
        //
        //        /!**
        //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
        //         *!/
        //        return false;
        //    }
        //},
        methods: {
            getSections         : function () {
                return this.model.getSections();
            },
            getTemplateAndFields: function (section) {
                return this.model.one(section).getTemplateAndFields();
            },
        }


    },
    layout : {
        template  : null,
        controller: function ($injector, $scope, builder) {
            // initSidebarLeft();
            //
            // function initSidebarLeft() {
            //     var aptTempl       = $injector.get('aptTempl');
            //     var gettextCatalog = $injector.get('gettextCatalog');
            //
            //     aptTempl.setSlotItem('sidebarLeft', 'Setting Sections', {
            //         title        : gettextCatalog.getString('Sections'),
            //         body         : '<div data-apt-setting-sections></div>',
            //         isCollapsed  : false,
            //         isCollapsable: false,
            //         showTitle    : false,
            //         _scopeId     : $scope.$id
            //     }, 'main.app999.setting');
            // }
        }
    }
});

priceBuilder.generate();*/
