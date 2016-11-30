// (function () {
//     var builder = applicationBuilder;
//     angular.module(builder.getModuleName()).config(fn);
//
//     fn.$inject = ['$injector'];
//     function fn($injector) {
//         var $routeSegmentProvider = $injector.get('$routeSegmentProvider');
//
//         /**
//          * Show the dashboard on initial load.
//          */
//         $routeSegmentProvider
//             .when(builder.url(), builder.segment(), {
//                 label: builder.title,
//                 // redirectTo: builder.url(':app_id/:app_name')
//             })
//             .when(builder.url(':app_id/:app_name'), builder.segment('current'), {
//                 access: {
//                     permission: [builder.permission('read','module')]
//                 },
//                 label : builder.title,
//                 parent: '/'
//             })
//             // .when('/application/:app_id/:app_name', 'main.app001.application.current', {
//             //     access: {
//             //         loginRequired: true,
//             //         permissions  : ['access_application_menu']
//             //     },
//             //     label : 'Application',
//             //     parent: '/application'
//             // })
//             .when(builder.url(':app_id/:app_name/edit/:row_nr'), builder.segment('current.edit'), {
//                 access: {
//                     permission: [builder.permission('read','module')]
//                 },
//                 label : 'Edit',
//                 parent: builder.url(':app_id/:app_name')
//             })
//             // .when('/application/:app_id/:app_name/edit/:row_nr', 'main.app001.application.current.edit', {
//             //     access: {
//             //         loginRequired: true,
//             //         permissions  : ['access_application_menu']
//             //     },
//             //     label : 'Edit',
//             //     parent: '/application/:app_id/:app_name'
//             // })
//             .when(builder.url(':app_id/:app_name/new'), builder.segment('current.new'), {
//                 access: {
//                     permission: [builder.permission('read','module')]
//                 },
//                 label : 'New',
//                 parent: builder.url(':app_id/:app_name')
//             })
//             // .when('/application/:app_id/:app_name/new', 'main.app001.application.current.new', {
//             //     access: {
//             //         loginRequired: true,
//             //         permissions  : ['access_application_menu']
//             //     },
//             //     label : 'New',
//             //     parent: '/application/:app_id/:app_name'
//             // })
//
//             // .within('main')
//             // .within('app001')
//             // .segment('application', {
//             //     templateUrl: 'app001/application/layout.tpl.html',
//             //     controller : 'ApplicationLayoutCtrl',
//             //     access     : {
//             //         loginRequired: false
//             //     }
//             // })
//             .within(builder.segment(1))
//             .within(builder.segment(2))
//             .segment(builder.segment(3), {
//                 // templateUrl: builder.getPath() + '/layout.tpl.html',
//                 template  : builder.getLayoutTemplate(),
//                 controller: builder.getControllerName('layout')
//             })
//             .within()
//             .segment('current', {
//                 template    : '<div data-apt-application-list autoload="false" params="{app_name:app_name, app_id:app_id}"></div>',
//                 controller  : builder.getControllerName('list'),
//                 dependencies: ['app_id', 'app_name']
//             })
//             .within()
//             .segment('edit', {
//                 template    : '<div data-apt-application-form params="{app_name:app_name, app_id:app_id, row_nr: row_nr}"></div>',
//                 controller  : builder.getControllerName('edit'),
//                 dependencies: ['app_id', 'app_name', 'row_nr']
//             })
//             .segment('new', {
//                 template    : '<section data-apt-application-form params="{app_name:app_name, app_id:app_id}"></section>',
//                 controller  : builder.getControllerName('new'),
//                 dependencies: ['app_id', 'app_name']
//             })
//         ;
//
//     }
//
// })();
