/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPackageBuilder.model,{
    normalize           : function (item) {
        aptBuilder.utils.makeBool(item, ['is_partial']);
        aptBuilder.utils.makeInt(item, ['qty']);
        aptBuilder.utils.makeObject(item, ['type_conf']);
    },
    restize             : function (item) {
        aptBuilder.utils.makeInt(item, ['is_partial']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                saleitemPackageBuilder.model.normalize(item);
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                saleitemPackageBuilder.model.restize(item);
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