// var clientBuilder = new aptBuilder({
//     domain      : 'client',
//     package     : 'app001',
//     icon        : 'icon-chess-queen',
//     title       : 'Client',
//     menu        : true,
//     create      : {
//         listDirective    : true,
//         formDirective    : true,
//         selectorDirective: true,
//         moduleService    : true,
//         modelService     : true,
//         layoutController : true,
//         managerDirective : true
//     },
//     widgets     : [
//         {
//             target : 'dashboard',
//             /**
//              * note that $scope is provided by the widget creator,
//              * could from dashboard or somewhere else.
//              *
//              * so, it has nothing to do with this module!!
//              *
//              * @param $scope
//              * @param $injector
//              */
//             creator: function ($scope, $injector) {
//                 var aptUtils         = $injector.get('aptUtils');
//                 var gettextCatalog   = $injector.get('gettextCatalog');
//                 var service          = $injector.get(clientBuilder.getServiceName('service'));
//                 var graphValues      = [];
//                 $scope.onGraphCreate = onGraphCreate;
//                 $scope.params        = {
//                     title           : gettextCatalog.getString('Client'),
//                     subTitle        : gettextCatalog.getString('Client Manager'),
//                     description     : null,
//                     color           : null,
//                     builder         : clientBuilder,
//                     headingMenuItems: [/*{
//                      text : gettextCatalog.getString('New Client'),
//                      icon : clientBuilder.icon,
//                      click: function (item) {
//                      service.addNew();
//                      }
//                      }*/{
//                         text : gettextCatalog.getString('Quick Client'),
//                         icon : clientBuilder.icon,
//                         click: service.addQuickClient
//                     }],
//                     /**
//                      * this is a d3 graph configuration
//                      */
//                     graph           : {
//                         type   : 'discreteBarChart',
//                         options: {
//                             chart: {
//                                 type      : 'discreteBarChart',
//                                 height    : 150,
//                                 margin    : {
//                                     top   : 10,
//                                     right : 30,
//                                     bottom: 50,
//                                     left  : 65
//                                 },
//                                 x         : function (d) {
//                                     return d.title;
//                                 },
//                                 y         : function (d) {
//                                     return parseInt(d.value);
//                                 },
//                                 showValues: true,
//                                 duration  : 1000,
//                                 xAxis     : {
//                                     axisLabel: gettextCatalog.getString('Weeks'),
//                                 },
//                                 yAxis     : {},
//                             }
//                         },
//                         /**
//                          * graphValues will be coming from service which means
//                          * we have deal with promise.
//                          * that's where we utilize the onGraphCreate function
//                          * onGraphCreate will retrieve data from server and
//                          * will assign the converted(!!) data into graphValues
//                          */
//                         data   : [{
//                             "key"   : "Quantity",
//                             "bar"   : true,
//                             "values": graphValues
//                         }]
//                     }
//                 };
//                 this.serviceObj.addWidget({
//                     template: '<apt-widget-builder ' +
//                     'params="params" ' +
//                     'on-graph-create="onGraphCreate(graphApi)"></apt-widget-builder>',
//                     _scopeId: $scope.$id
//                 });
//
//                 function onGraphCreate(graphApi) {
//                     service.getWidgetDataForDashboard().then(function (data) {
//                         aptUtils.emptyAndMerge(graphValues, data['weekly_totals']);
//                         graphApi.refresh();
//
//                         ///
//
//                         $scope.params.title += ' (' + data['stats_totals']['client_count'] + ')';
//                         $scope.params.description = gettextCatalog.getString('Active', null, 'Client Status') + ': ' + data['stats_totals']['sale_count']
//                             + ', ' + gettextCatalog.getString('Passive', null, 'Client Status') + ': ' + data['stats_totals']['no_sale_count'];
//                     });
//                 }
//             }
//         }
//     ],
//     onRun       : function ($injector) {
//         var hotkeys        = $injector.get('hotkeys');
//         var $rootScope     = $injector.get('$rootScope');
//         var gettextCatalog = $injector.get('gettextCatalog');
//         hotkeys.bindTo($rootScope)
//             .add({
//                 combo      : 'ctrl+alt+c',
//                 description: gettextCatalog.getString('Client Manager'),
//                 callback   : function () {
//                     var aptUtils = $injector.get('aptUtils');
//                     aptUtils.goto({segment: 'main.app001.client'});
//                 }
//             });
//     },
//     model       : {
//         normalize           : function (item) {
//             aptBuilder.utils.makeInt(item, ['client_id', 'enterprise_id', 'person_id', 'entity_id', 'staff_id', 'account_id', 'card_id', 'client_group_id']);
//             aptBuilder.utils.makeNativeDate(item, ['registration_date']);
//             aptBuilder.utils.makeBool(item, ['is_deleted', '__is_incomplete']);
//             item.contact_json = _.has(item, 'contact_json') ? JSON.parse(item.contact_json) : null;
//         },
//         restize             : function (item) {
//             aptBuilder.utils.makeString(item, ['registration_date', 'is_deleted']);
//         },
//         responseInterceptors: [
//             {
//                 operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
//                 callback : function (item) {
//                     clientBuilder.model.normalize(item);
//                     item._selectorTitle = item.name;
//
//                     return item;
//                 }
//             }
//         ],
//         requestInterceptors : [
//             {
//                 operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
//                 callback : function (item) {
//                     clientBuilder.model.restize(item);
//                     if (_.has(item, 'quickPersonData')) {
//                         personBuilder.model.restize(item.quickPersonData);
//                     }
//                     return item;
//                 }
//             }
//         ],
//         methods             : {
//             element   : [
//                 {name: 'getClientCardList', httpMethod: 'getList', route: 'card'},
//                 {name: 'getInvoiceProfile', httpMethod: 'get', route: 'invoiceProfile'},
//                 {name: 'getSaleProfile', httpMethod: 'get', route: 'saleProfile'},
//                 {name: 'getSaleHistory', httpMethod: 'get', route: 'saleHistory'},
//                 {name: 'getOverviewProfile', httpMethod: 'get', route: 'overviewProfile'},
//             ],
//             collection: [
//                 {name: 'getByCardNr', httpMethod: 'get', route: 'getByCardNr'},
//                 {name: 'getWidgetDataForDashboard', httpMethod: 'get', route: 'widget/dashboard'}
//             ]
//         }
//     },
//     service     : {
//         /*   edit   : {
//          before: function ($injector, data, popup) {
//          var restOp = $injector.get('restOperationService');
//          restOp.edit({
//          type  : clientBuilder.domain,
//          suffix: 'manager',
//          data  : data,
//          popup : popup
//          });
//
//          /!**
//          * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
//          *!/
//          return false;
//          }
//          },*/
//         methods: {
//             getInvoiceProfile        : function (item_id) {
//                 return this.model.one(item_id).getInvoiceProfile();
//             },
//             getSaleProfile           : function (item_id) {
//                 return this.model.one(item_id).getSaleProfile();
//             },
//             getOverviewProfile       : function (item_id) {
//                 return this.model.one(item_id).getOverviewProfile();
//             },
//             getByCardNr              : function (card_nr) {
//                 return this.model.getByCardNr(card_nr);
//             },
//             getWidgetDataForDashboard: function () {
//                 return this.model.getWidgetDataForDashboard();
//             },
//             addQuickClient           : function () {
//                 var params         = {
//                     formType: 'quick',
//                     stay    : false
//                 };
//                 var $templateCache = this.$injector.get('$templateCache');
//                 var dialogs        = this.$injector.get('dialogs');
//                 var aptTempl       = this.$injector.get('aptTempl');
//
//                 $templateCache.put('app001/client/directives/manager/manager.html',
//                     '<div data-apt-client-manager params="params" ></div>');
//                 dialogs.create('app001/client/directives/manager/manager.html', [
//                     '$scope',
//                     '$uibModalInstance',
//                     function ($scope, $uibModalInstance) {
//                         $scope.params = params;
//
//                     }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
//             },
//
//             openSaleHistory: function (client) {
//
//                 var $templateCache = this.$injector.get('$templateCache');
//                 var dialogs        = this.$injector.get('dialogs');
//                 var aptTempl       = this.$injector.get('aptTempl');
//
//                 $templateCache.put('app001/client/directives/saleHistory/saleHistory.html',
//                     '<div data-apt-client-sale-history item="client" ></div>');
//                 dialogs.create('app001/client/directives/saleHistory/saleHistory.html', [
//                     '$scope',
//                     '$uibModalInstance',
//                     function ($scope, $uibModalInstance) {
//                         $scope.client = client;
//
//                     }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
//             },
//
//             getSaleHistory: function (item_id) {
//                 return this.model.one(item_id).getSaleHistory();
//             }
//         }
//     },
//     form        : {
//         suffix    : 'manager',
//         controller: function ($injector, $scope, builder) {
//
//             var vm         = this;
//             var $rootScope = $injector.get('$rootScope');
//             var aptUtils   = $injector.get('aptUtils');
//             var service    = $injector.get(clientBuilder.getServiceName('service'));
//             var model      = $injector.get(clientBuilder.getServiceName('model'));
//             var clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
//
//             vm.clientSelected = clientSelectedFn;
//             vm.selectedId     = null;
//             vm.clientFormType = vm.clientFormType || clientType;
//
//             vm.selectQuickClientFormType = selectQuickClientFormTypeFn;
//             vm.clientQuickFormType       = null;
//             function selectQuickClientFormTypeFn(data) {
//                 var type = data.name;
//
//                 if (!_.has(vm.form.data, 'quickAddressData')) {
//                     vm.form.data.quickAddressData = {};
//                 } else {
//                     aptUtils.nullifyObjectProperties(vm.form.data.quickAddressData);
//                 }
//
//                 if (!_.has(vm.form.data, 'quickContactData')) {
//                     vm.form.data.quickContactData = {};
//                 } else {
//                     aptUtils.nullifyObjectProperties(vm.form.data.quickContactData);
//                 }
//
//                 switch (type) {
//                     case 'person':
//                         vm.clientQuickFormType       = type;
//                         vm.form.data.quickPersonData = {};
//                         if (_.has(vm.form.data, 'quickEntityData')) {
//                             delete vm.form.data.quickEntityData;
//                         }
//                         break;
//                     case 'entity':
//                         vm.clientQuickFormType       = type;
//                         vm.form.data.quickEntityData = {
//                             business_name: null
//                         };
//                         if (_.has(vm.form.data, 'quickPersonData')) {
//                             delete vm.form.data.quickPersonData;
//                         }
//                         break;
//                 }
//
//             }
//
//             loadFilter();
//
//             var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
//                 loadFilter();
//             });
//
//             $scope.$on('$destroy', function () {
//                 listener();
//             });
//
//
//             function loadFilter() {
//                 var _clientType   = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
//                 vm.clientFormType = _clientType;
//             };
//
//             function clientSelectedFn() {
//                 if (clientType == 'person') {
//                     vm.selectedId = vm.form.data.person_id;
//                 }
//                 if (clientType == 'entity') {
//                     vm.selectedId = vm.form.data.entity_id;
//                 }
//             }
//
//         }
//     },
//     beforeAddNew: function ($injector, $scope, builder) {
//         var dialogs        = $injector.get('dialogs');
//         var $templateCache = $injector.get('$templateCache');
//         var $q             = $injector.get('$q');
//         var $timeout       = $injector.get('$timeout');
//         var aptTempl       = $injector.get('aptTempl');
//         var service        = $injector.get(builder.getServiceName('service'));
//         var defer          = $q.defer();
//         var vm             = this;
//
//         $timeout(function () {
//             $templateCache.put(clientBuilder.getPath('cache') + '/clientTypeSelectorPopup',
//                 // '<apt-panel class="no-margin"><apt-panel-title><span translate>Select Type</span></apt-panel-title>' +
//                 '<apt-client-type-selector on-completed="onCompleted(data)"></apt-client-type-selector>' +
//                     // '</apt-panel>' +
//                 '');
//             dialogs.create(clientBuilder.getPath('cache') + '/clientTypeSelectorPopup', [
//                 '$scope',
//                 '$uibModalInstance',
//                 function ($scope, $uibModalInstance) {
//                     // $uibModalInstance.close();
//                     // $scope.data        = {type: null};
//                     $scope.onCompleted = function (data) {
//
//                         service.vars.clientType = data.type;
//                         $uibModalInstance.close();
//                         defer.resolve();
//                     };
//
//                 }], undefined, aptTempl.appConfig.defaults.dialogs.confirm);
//         });
//         return defer.promise;
//     },
//     list        : {
//
//         rowMenu: function ($injector, vm) {
//
//             var Menu           = $injector.get('aptMenu');
//             var ClientService  = $injector.get('ClientService');
//             var $templateCache = $injector.get('$templateCache');
//             var dialogs        = $injector.get('dialogs');
//
//             var rowMenu = Menu.Item({
//                 name   : 'row-menu',
//                 'class': 'btn-group-xs'
//             });
//
//
//             var menuItemEdit    = Menu.Item({
//                 text     : 'Edit',
//                 translate: true,
//                 icon     : 'icon-pencil',
//                 'class'  : 'dropdown-toggle btn-default',
//                 click    : function (item) {
//
//                     if (_.isNull(item.entity_id)) {
//                         ClientService.vars.clientType = 'person';
//                     }
//                     if (_.isNull(item.person_id)) {
//                         ClientService.vars.clientType = 'entity';
//                     }
//
//                     ClientService.edit(item, {popup: true, stay: true, suffix: 'manager'});
//                 }
//             });
//             var menuItemDelete  = Menu.Item({
//                 text   : 'Delete',
//                 icon   : 'icon-close2',
//                 'class': 'btn-danger',
//                 click  : function (item) {
//                     ClientService.delete(item);
//                 }
//             });
//             var menuItemCurrent = Menu.Item({
//                 text : currentBuilder.title,
//                 icon : currentBuilder.icon,
//                 click: function (item) {
//
//
//                     var currentService = $injector.get(currentBuilder.getServiceName('Service'));
//
//                     var filter = {
//                         id  : item.client_id,
//                         type: 'client'
//                     };
//
//                     currentService.showCurrentPopup(filter);
//                 }
//             });
//
//             rowMenu.addChild(menuItemEdit);
//             rowMenu.addChild(menuItemDelete);
//             rowMenu.addChild(menuItemCurrent);
//
//             return rowMenu;
//         },
//
//
//         controller: function ($injector, $scope, builder) {
//
//             var vm         = this;
//             var $rootScope = $injector.get('$rootScope');
//             var aptUtils   = $injector.get('aptUtils');
//             var $timeout   = $injector.get('$timeout');
//             var service    = $injector.get(builder.getServiceName('service'));
//             var model      = $injector.get(builder.getServiceName('model'));
//             var clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
//
//
//             if (!vm.filter) {
//                 vm.filter = {};
//             }
//
//             loadFilter();
//
//             var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
//                 $timeout(function () {
//                     loadFilter();
//                     vm.reload();
//                 });
//             });
//
//             $scope.$on('$destroy', function () {
//                 listener();
//             });
//
//
//             function loadFilter() {
//                 var _filter     = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
//                 // var _clientType = service.vars.clientType || aptUtils.getUrlSearchParamValue('clientType') || 'person';
//                 var _clientType = aptUtils.getUrlSearchParamValue('clientType') || 'person';
//
//                 if (_filter) {
//                     aptUtils.removeAndMerge(vm.filter, _filter);
//                 }
//
//                 if (_clientType) {
//                     angular.merge(vm.filter, {
//                         clientType: _clientType
//                     });
//                 }
//
//                 if (_.has(vm.params, 'clientType')) {
//                     if (vm.params.clientType == 'allClient') {
//                         aptUtils.nullifyObjectProperties(vm.filter);
//                     }
//                 }
//             }
//         }
//     },
//     selector    : {
//         controller: function ($injector, $scope, builder) {
//
//             var vm               = this;
//             var NotifyingService = $injector.get('NotifyingService');
//             var aptUtils         = $injector.get('aptUtils');
//             var $timeout         = $injector.get('$timeout');
//             var service          = $injector.get(builder.getServiceName('service'));
//
//             if (angular.isFunction(vm.onchange)) {
//                 NotifyingService.subscribe($scope, 'cardReader:client', function (event, cardObj) {
//                     var waitConf = {
//                         title   : gettextCatalog.getString('Finding client'),
//                         message : gettextCatalog.getString('Please wait while the client card is being searched'),
//                         progress: 10
//                     };
//                     aptUtils.showWait(waitConf);
//                     service.getByCardNr({card_nr: cardObj.data}).then(function (data) {
//                         // vm.selectedItem(null); // didn't work, we should find another way to reset the selected item if there is any.
//                         waitConf.progress = 80;
//                         vm.onchange({data: data});
//                         $timeout(function () {
//                             waitConf.progress = 100;
//                         }, 100);
//                     });
//                 });
//             }
//         }
//     },
//     layout      : {
//         templConfig: {
//             showSidebarLeft: true
//         }
//     },
//     manager     : {
//         controller: function ($injector, $scope, builder) {
//             var vm = this;
//
//             vm.formType = _.has(vm.params, 'formType') ? vm.params.formType : 'nested'
//             vm.stay     = _.has(vm.params, 'stay') ? vm.params.stay : 'true'
//
//         }
//     },
//
// });
//
// clientBuilder.generate();
