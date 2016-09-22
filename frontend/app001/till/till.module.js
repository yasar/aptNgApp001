/**
 * Created by murat on 30.04.2016.
 */
var tillBuilder = new aptBuilder({
    domain : 'till',
    package: 'app001',
    icon   : 'icon-station',
    create : {
        listDirective    : true,
        formDirective    : false,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true
    },
    model  : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    tillBuilder.utils.makeInt(item,['till_id']);
                    item._selectorTitle = item.till;
                }
            }
        ]
    },
    list   : {
        controller: function ($injector, $scope, builder) {
            
        }
    }
});

tillBuilder.generate();