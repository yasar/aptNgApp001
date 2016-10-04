/**
 * Created by burak on 26.09.2016.
 */
_.merge(couponBuilder.model,{
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {

                couponBuilder.utils.makeInt(item, ['is_published']);

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

            {name: 'getOverview', httpMethod: 'get', route: 'overview'},

            /**
             * line 198'e açıklama yapıldı.
             */
            //{name: 'checkValidity', httpMethod: 'get', route: 'checkValidity'}
        ],
        collection: [
            {name: 'inspect', httpMethod: 'post', route: 'couponInspector'}
        ]
    }
});
