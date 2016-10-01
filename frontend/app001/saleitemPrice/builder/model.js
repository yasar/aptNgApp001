/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPriceBuilder.model,{
    normalize           : function (item) {
        aptBuilder.utils.makeBool(item, ['is_active', 'is_primary', 'is_price_inuse']);
        aptBuilder.utils.makeInt(item, ['price_type_id']);

        _.isObject(item.price) && priceBuilder.model.normalize(item.price);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                saleitemPriceBuilder.model.normalize(item);
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                saleitemPriceBuilder.utils.makeInt(item, ['is_active', '__is_incomplete']);
                if (_.has(item, 'price')) {
                    saleitemPriceBuilder.utils.makeInt(item.price, ['is_tax_included', 'tax']);
                }
                return item;
            }
        }
    ],
    methods            : {
        element   : [

            {name: 'setPrimary', httpMethod: 'put', route: 'setPrimary'}
        ],
        collection: null
    }
})