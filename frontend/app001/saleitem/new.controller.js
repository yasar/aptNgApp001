/**
 * Created by murat on 24.12.2015.
 */

// (function () {
//     angular
//         .module('apt.app001.saleitem')
//         .controller('SaleitemNewCtrl', fn);
//
//     fn.$inject = ['$scope', 'aptTempl','aptMenu', '$routeSegment', 'gettextCatalog'];
//
//     function fn($scope, Templ, Menu, $routeSegment, gettextCatalog) {
//         Templ.page.title = gettextCatalog.getString('Sale Item');
//         Templ.page.icon = saleitemBuilder.icon;
//
//         Templ.config.breadcrumb = false;
//         Templ.config.fillContent = true;
//         Templ.config.showSidebarLeft = true;
//         Templ.config.showSidebarRight = true;
//
//
//         // Templ.setSlotItem('sidebarLeft', 'saleitem_list', {
//         //     title: '{{"Action" | translate }} ',
//         //     body: '<h5>Deneme1</h5>',
//         //     _scopeId: $scope.$id
//         // });
//
//         Menu.get('moduleMenu').clear().addChild({
//             text: gettextCatalog.getString('Cancel'),
//             class: 'btn btn-danger btn-sm',
//             icon: 'fa fa-remove fa-2',
//             href: $routeSegment.getSegmentUrl('main.app001.saleitem.list'),
//             auth: ['read_saleitem_module'],  click: function () {
//                 return true;
//             }
//         });
//     }
// })();