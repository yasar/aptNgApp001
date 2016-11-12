/**
 * Created by engin on 26.09.2016.
 */
var saleitemPriceBuilder = new aptBuilder({
    domain : 'saleitemPrice',
    package: 'app001',
    icon   : 'icon-cash4',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : true
    },
    form   : {
        title     : 'Price',
        controller: function ($injector, $scope, builder) {
            var $routeSegment = $injector.get('$routeSegment');
            var vm            = $scope[builder.getControllerAsName('form')];


        }
    },
});

