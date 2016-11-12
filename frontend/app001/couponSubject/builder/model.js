/**
 * Created by engin on 26.09.2016.
 */
_.merge(couponSubjectBuilder.model,{
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item) {

                couponSubjectBuilder.utils.makeInt(item,
                    ['type_id', 'target_scope_type_id',
                        'saleitem_group_id', 'brand_id', 'saleitem_id','coupon_subject_id']);

                var saleitemName  = item.saleitem_name ? ' - '+item.saleitem_name : ' ';
                var saleitemGroup = item.saleitemgroup ? ' - '+item.saleitemgroup : ' ';

                item._selectorTitle = _.upperFirst(item.type) + saleitemName +  saleitemGroup;

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