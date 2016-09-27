/**
 * Created by engin on 26.09.2016.
 */
_.merge(shoppingCartBuilder.model,{
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
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
})