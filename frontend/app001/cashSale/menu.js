/**
 * Created by unal on 30.03.2016.
 */


(function () {
    return;
    angular
        .module('apt.app001.cashSale')
        .run(fn);

    fn.$inject = ['aptMenu', '$routeSegment'];

    function fn(Menu, $routeSegment) {
        Menu.get('sideMenu').addChild({
            text: 'Sale',
            icon: 'icon-cart',
            href: $routeSegment.getSegmentUrl('main.app001.cashSale'),
            auth: ['access_saleitem_menu'],
            order: 55
        });
    }
})();