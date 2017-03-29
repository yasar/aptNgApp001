/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponConditionBuilder.model,{
    normalize           : function (item) {
        aptBuilder.utils.makeTime(item, ['start_time', 'end_time']);
        if (item.start_date && item.end_date) {
            aptBuilder.utils.makeDate(item, ['start_date', 'end_date']);
            item.date_range = {
                startDate: item.start_date,
                endDate  : item.end_date
            }
        }
    },
    restsize            : function (item) {

        if (item.date_range) {
            aptBuilder.utils.makeString(item.date_range, ['startDate']);
            aptBuilder.utils.makeString(item.date_range, ['endDate']);
            item.start_date = item.date_range.startDate;
            item.end_date   = item.date_range.endDate;
        }

//        aptBuilder.utils.formatTimeForDb(item, ['start_time', 'end_time']);
        aptBuilder.utils.makeTime(item, ['start_time', 'end_time']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {

                couponConditionBuilder.model.normalize(item);
                couponConditionBuilder.utils.makeInt(item, ['condition_type_id', 'event_type_id', 'shopping_channel_type_id']);
                return item;
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                couponConditionBuilder.model.restsize(item);
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