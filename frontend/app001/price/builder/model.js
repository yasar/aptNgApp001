/**
 * Created by engin on 26.09.2016.
 */
_.merge(priceBuilder.model, {
    normalize           : function (item) {
        aptBuilder.utils.makeInt(item, ['currency_id', 'enterprise_id', 'price_id', 'tax_id']);
        /**
         * tax and tax_amount are the same thing.
         * we should remove tax_amount(?or tax: not sure)  from the database.
         */
        aptBuilder.utils.makeNumber(item, ['base_price', 'price', 'tax', 'tax_amount', 'taxed_price', 'tax_percentage',
            'currency_rate', 'discount_amount', 'discount_percentage']);
        aptBuilder.utils.makeBool(item, ['is_tax_included', 'uses_enterprise_id', '__is_incomplete']);

        item.discount_type = item.discount_type || null;
        if (item.discount_percentage && !item.discount_amount) {
            item.discount_type = 'percentage';
        }
        else if (!item.discount_percentage && item.discount_amount) {
            item.discount_type = 'amount';
        }

        /**
         * check to see what is using this!!
         */
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
})