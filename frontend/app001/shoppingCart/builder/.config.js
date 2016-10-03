/**
 * Created by engin on 26.09.2016.
 */
var shoppingCartBuilder = new aptBuilder({
    domain : 'shoppingCart',
    package: 'app001',
    create : {
        listDirective    : false,
        formDirective    : false,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true
    }
});