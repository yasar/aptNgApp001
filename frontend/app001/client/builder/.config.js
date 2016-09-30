/**
 * Created by burak on 26.09.2016.
 */
var clientBuilder = new aptBuilder({
    domain      : 'client',
    package     : 'app001',
    icon        : 'icon-chess-queen',
    title       : 'Client',
    menu        : true,
    create      : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        managerDirective : true,
        routeConfig      : true
    },
    onRun       : function ($injector) {
        var hotkeys        = $injector.get('hotkeys');
        var $rootScope     = $injector.get('$rootScope');
        var gettextCatalog = $injector.get('gettextCatalog');
        hotkeys.bindTo($rootScope)
            .add({
                combo      : 'ctrl+alt+c',
                description: gettextCatalog.getString('Client Manager'),
                callback   : function () {
                    var aptUtils = $injector.get('aptUtils');
                    aptUtils.goto({segment: 'main.app001.client'});
                }
            });
    },
});

