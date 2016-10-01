/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponRewardBuilder.model,{

    restize:function(item){
        aptBuilder.utils.makeInt(item,['is_subtracted_from_sale_totals','is_discounted_price_regarded','is_percentage']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                couponRewardBuilder.utils.makeBool(item, ['is_percentage', 'is_subtracted_from_sale_totals', 'is_discounted_price_regarded']);
                couponRewardBuilder.utils.makeInt(item, ['reward_type_id']);
                return item;
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                couponRewardBuilder.model.restize(item);
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