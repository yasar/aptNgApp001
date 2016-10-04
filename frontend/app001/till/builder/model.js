/**
 * Created by engin on 26.09.2016.
 */
_.merge(tillBuilder.model,{
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {
                tillBuilder.utils.makeInt(item,['till_id']);
                item._selectorTitle = item.till;
            }
        }
    ]
})