_.merge(cardFundBuilder.model, {
    normalize           : function (item) {
        aptBuilder.utils.makeInt(item, ['card_fund_id', 'enterprise_id', 'transaction_id', 'card_id', 'client_id']);
        aptBuilder.utils.makeNumber(item, ['deposit', 'withdraw', 'balance']);
        aptBuilder.utils.makeNativeDate(item, ['date']);
    },
    restize             : function (item, $injector) {
        aptBuilder.utils.makeString(item, ['date']);
        aptBuilder.utils.makeInt(item, ['card_id', 'client_id']);
        aptBuilder.utils.makeNumber(item, ['deposit', 'withdraw', 'balance']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item, what, url, $injector) {
                cardFundBuilder.model.normalize(item);
                return item;
            }
        }
    ],
    requestInterceptors : [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item, what, url, $injector) {
                cardFundBuilder.model.restize(item, $injector);
                return item;
            }
        }
    ],
    methods             : {
        element   : null,
        collection: null
    }
});
