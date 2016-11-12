/**
 * Created by engin on 26.09.2016.
 */
var priceBuilder = new aptBuilder({
    domain : 'price',
    title  : 'Price',
    package: 'app001',
    icon   : 'icon-cash2',
    menu   : false,
    create : {
        listDirective    : false,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : true,
        layoutController : false
    },
});

