/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemBuilder.model,{
    normalize           : function (item) {

        aptBuilder.utils.makeNumber(item, ['base_price', 'tax', 'price', 'taxed_price', 'stock']);
        aptBuilder.utils.makeInt(item, ['saleitem_id', 'enterprise_id', 'type_id',
            'brand_id', 'model_id', 'group_id', 'unit_id', 'count']);
        aptBuilder.utils.makeBool(item, ['is_stock_enabled', '__is_incomplete']);
        aptBuilder.utils.makeObject(item, ['type_conf']);
    },
    restize             : function (item, $injector) {
        aptBuilder.utils.makeInt(item, ['is_stock_enabled']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {

                saleitemBuilder.model.normalize(item);
                item._selectorTitle = item.name;

                return item;
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                saleitemBuilder.model.restize(item);
                saleitemBuilder.utils.makeBool(item, ['__is_incomplete']);
                return item;
            }
        }
    ],
    methods            : {
        element   : [

            //{name: 'getOverview', httpMethod: 'get', route: 'overview'},
        ],
        collection: [
            {name: 'getByBarcode', httpMethod: 'get', route: 'getByBarcode'},
            {name: 'getMostSoldSaleitem', httpMethod: 'get', route: 'mostSoldSaleitem'}


        ]
    }
})