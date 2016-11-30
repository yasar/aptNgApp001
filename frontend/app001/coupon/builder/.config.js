/**
 * Created by burak on 26.09.2016.
 */
var couponBuilder = new aptBuilder({
    domain            : 'coupon',
    package           : 'app001',
    icon              : 'icon-gift',
    enableStatusUpdate: true,
    title             : 'Coupon',
    menu              : {
        target: 'enterprise'
    },
    create            : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        managerDirective : true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : true
    },
    onRun             : function ($injector) {
        var hotkeys    = $injector.get('hotkeys');
        var $rootScope = $injector.get('$rootScope');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 'ctrl+alt+c',
                description: 'Coupon Manager',
                callback   : function () {
                    var service = $injector.get(couponBuilder.getServiceName('service'));
                    service.showListing();
                }
            });
    }
});

