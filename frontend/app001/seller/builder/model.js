/**
 * Created by engin on 26.09.2016.
 */
_.merge(sellerBuilder.model,{
    normalize           : function (item) {
        aptBuilder.utils.makeInt(item, ['seller_id', 'enterprise_id', 'entity_id',
            'person_id', 'staff_id', 'account_id']);
        aptBuilder.utils.makeNativeDate(item, ['registration_date']);
        aptBuilder.utils.makeBool(item, ['__is_incomplete']);
    },
    restize             : function (item) {
        aptBuilder.utils.makeString(item, ['registration_date']);

    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                sellerBuilder.model.normalize(item);
                item._selectorTitle = item.name;
                return item;
            }
        }
    ],
    requestInterceptors : [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                sellerBuilder.model.restize(item);
                return item;
            }
        }
    ],
    methods             : {
        element   : [
            {name: 'getOverviewProfile', httpMethod: 'get', route: 'overviewProfile'}
            //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
        ],
        collection: null
    }
})