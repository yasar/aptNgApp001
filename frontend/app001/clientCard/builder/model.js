/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientCardBuilder.model,{
    restize            : function (item) {
        aptBuilder.utils.makeInt(item, ['is_primary']);

        if (_.has(item, 'setPassword') && !item.setPassword) {
            delete item.password;
        }
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                aptBuilder.utils.makeInt(item, ['client_card_id', 'client_id', 'card_id', 'enterprise_id']);
                aptBuilder.utils.makeBool(item, ['is_primary']);
                item._selectorTitle = item.card_no;
                return item;
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                clientCardBuilder.model.restize(item);
                return item;
            }
        }
    ],
    methods            : {
        element   : [

            // {name: 'getInvoiceProfile', httpMethod: 'get', route: 'invoiceProfile'}
        ],
        collection: null
    }
});
