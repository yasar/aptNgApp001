/**
 * Created by burak on 26.09.2016.
 */
_.merge(cardBuilder.model, {
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback: function (item) {
                item._selectorTitle = item.card_no;
                cardBuilder.utils.makeInt(item, ['card_id', 'type_id']);
                return item;
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback: function (item) {
                return item;
            }
        }
    ],
    methods: {
        element: [

            //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
        ],
        collection: [
            {name: 'import', httpMethod: 'post', route: 'import'}

        ]
    }
});
