/**
 * Created by burak on 26.09.2016.
 */
_.merge(clientBuilder.model,{
    normalize           : function (item) {
        aptBuilder.utils.makeInt(item, ['client_id', 'enterprise_id', 'person_id', 'entity_id', 'staff_id', 'account_id', 'card_id', 'client_group_id']);
        aptBuilder.utils.makeNativeDate(item, ['registration_date']);
        aptBuilder.utils.makeBool(item, ['is_deleted', '__is_incomplete']);
        item.contact_json = _.has(item, 'contact_json') ? JSON.parse(item.contact_json) : null;
    },
    restize             : function (item) {
        aptBuilder.utils.makeString(item, ['registration_date', 'is_deleted']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                clientBuilder.model.normalize(item);
                item._selectorTitle = item.name;

                return item;
            }
        }
    ],
    requestInterceptors : [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                clientBuilder.model.restize(item);
                if (_.has(item, 'quickPersonData')) {
                    personBuilder.model.restize(item.quickPersonData);
                }
                return item;
            }
        }
    ],
    methods             : {
        element   : [
            {name: 'getClientCardList', httpMethod: 'getList', route: 'card'},
            {name: 'getInvoiceProfile', httpMethod: 'get', route: 'invoiceProfile'},
            {name: 'getSaleProfile', httpMethod: 'get', route: 'saleProfile'},
            {name: 'getSaleHistory', httpMethod: 'get', route: 'saleHistory'},
            {name: 'getOverviewProfile', httpMethod: 'get', route: 'overviewProfile'},
        ],
        collection: [
            {name: 'getByCardNr', httpMethod: 'get', route: 'getByCardNr'},
            {name: 'getWidgetDataForDashboard', httpMethod: 'get', route: 'widget/dashboard'}
        ]
    }
});
