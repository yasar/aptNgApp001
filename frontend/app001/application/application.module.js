/**
 * Created by unal on 23.03.2016.
 */


var applicationBuilder = new aptBuilder({
    domain   : 'application',
    package  : 'app001',
    icon     : 'icon-lab',
    title    : 'Applications',
    menu     : false,
    authorize: true,
    create   : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
    model    : {
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    item._selectorTitle = item.title;
                    return item;
                }
            }
        ],

        requestInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    return item;
                }
            }
        ],
        methods            : {
            element   : [
                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: [
                //{name: 'import', httpMethod: 'post', route: 'import'}
            ]
        }
    },
    service  : {
        methods: {}
    },
    form     : {
        controller: function ($injector, $scope, builder) {

            var vm = this;


            return;

            var vm         = this;
            var $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                service    = $injector.get(cardBuilder.getServiceName('service')),
                model      = $injector.get(cardBuilder.getServiceName('model'));
        }
    },
    list     : {
        rowMenu   : function ($injector, vm) {
            var Menu          = $injector.get('aptMenu'),
                aptUtils      = $injector.get('aptUtils'),
                $routeSegment = $injector.get('$routeSegment'),
                model         = $injector.get(applicationBuilder.getServiceName('model')),
                service       = $injector.get(applicationBuilder.getServiceName('service'));


            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemEdit = Menu.Item({
                text     : 'Edit',
                translate: false,
                icon     : 'edit',
                'class'  : 'dropdown-toggle btn-default',
                click    : function (item) {
                    aptUtils.goto({
                        segment: {
                            name  : 'main.app001.application.current.edit',
                            params: {
                                row_nr  : item.row_nr,
                                app_id  : item.app_id,
                                app_name: item.app_name
                            }
                        }
                    });
                }
            });

            var menuItemDelete = Menu.Item({
                text   : 'Delete',
                icon   : 'delete',
                'class': 'btn-danger',
                click  : function (item) {
                    aptUtils.showDeleteConfirm(function () {
                        model.one(item.app_id).one(item.row_nr).remove().then(function (response) {
                            if (response) {
                                var idx = _.findIndex(vm.data, {row_nr: item.row_nr});
                                vm.data.splice(idx, 1);
                            }
                        });
                    });
                }
            });

            rowMenu.addChild(menuItemEdit);
            rowMenu.addChild(menuItemDelete);

            return rowMenu;
        },
        controller: function ($injector, $scope, builder) {

            var vm    = this,
                model = $injector.get(builder.getServiceName('model'));

            vm.data = [];

            model.one(vm.params.app_id).getList().then(function (data) {
                angular.merge(vm.data, data);
            });

        }
    },
    layout   : {
        templConfig: {
            showSidebarLeft : true,
            showSidebarRight: false
        },
        // template   : '<div class="" app-view-segment="4"></div> <apt-panel><div app-view-segment="3"></div></apt-panel>',
        template   : '<div class="" app-view-segment="4"></div><div app-view-segment="3"></div>',
        controller : function ($injector, $scope, builder) {

            var aptMenu          = $injector.get('aptMenu');
            var aptTempl         = $injector.get('aptTempl');
            var NotifyingService = $injector.get('NotifyingService');
            var gettextCatalog   = $injector.get('gettextCatalog');
            var $routeSegment    = $injector.get('$routeSegment');
            var service          = $injector.get(builder.getServiceName('service'));

            aptMenu.get('moduleMenu').clear().addChild({
                // text : gettextCatalog.getString('Add New') + ': ' + $routeSegment.$routeParams.name + ' Message',
                text : gettextCatalog.getString('Add New') + ': ' + _.startCase($routeSegment.$routeParams.app_name),
                class: 'btn btn-primary btn-sm',
                icon : 'icon-plus',
                href : $routeSegment.getSegmentUrl('main.app001.application.current.new', {
                    app_id  : $routeSegment.$routeParams.app_id,
                    app_name: $routeSegment.$routeParams.app_name
                }),
                auth : ['create_application_module'],
                click: function () {
                    return true;
                }
            });
            $scope.insideMenu = aptMenu.get('insideMenu');
            $scope.insideMenu.clear();
            $scope.insideMenuConfig = {
                liHasSubMenuClass: '',
                ulIsSubMenuClass : 'sub-menu'
            };

            aptTempl.setSlotItem('sidebarLeft', 'categories', {
                title   : '{{"Categories" | translate }} ',
                body    : '<ul apt-menu-builder menu-type="limitless" ng-model="insideMenu"' + ' class="navigation navigation-alt navigation-accordion" btn-size="xs"' + ' config="insideMenuConfig"> </ul>',
                _scopeId: $scope.$id
            });

            aptTempl.setSlotRouteSegment();

            service.loadRepo({group_name: 'belleza'}, true);
            NotifyingService.subscribe($scope, 'application:loaded', function (event) {
                var data = service.getRepo();
                _.forEach(data, function (application) {
                    aptMenu.get('insideMenu').addChild({
                        text: application.title,
                        icon: 'fa fa-users',
                        href: $routeSegment.getSegmentUrl('main.app001.application.current', {
                            app_id  : application.app_id,
                            app_name: application.name.toLowerCase()
                        })
                    });
                });
            });

        }
    }
});

applicationBuilder.generate();

