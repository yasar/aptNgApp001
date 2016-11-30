var cashSaleBuilder = new aptBuilder({
    domain   : 'cashSale',
    title    : 'Sale',
    package  : 'app001',
    // dependencies: ['shoppingCart'],
    icon     : 'icon-cart2',
    authorize: true,
    menu     : {
        order: 2
    },
    create   : {
        listDirective    : false,
        formDirective    : false,
        selectorDirective: true,
        managerDirective : true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : true,
    },
    onRun    : function ($injector) {
        var hotkeys        = $injector.get('hotkeys');
        var $rootScope     = $injector.get('$rootScope');
        var gettextCatalog = $injector.get('gettextCatalog');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 's s s',
                description: gettextCatalog.getString('Cash Sale'),
                callback   : function () {
                    var aptUtils = $injector.get('aptUtils');
                    aptUtils.goto({segment: 'main.app001.cashSale'});
                }
            });
    },


});

