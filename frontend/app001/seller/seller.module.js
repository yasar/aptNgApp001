/**
 * Created by unal on 19.03.2016.
 */


var sellerBuilder = new aptBuilder({
    domain      : 'seller',
    package     : 'app001',
    icon        : 'icon-truck',
    title       : 'Supplier',
    menu        : true,
    create      : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
    model       : {
        normalize           : function (item) {
            aptBuilder.utils.makeInt(item, ['seller_id', 'enterprise_id', 'entity_id',
                'person_id', 'staff_id', 'account_id']);
            aptBuilder.utils.makeNativeDate(item, ['registration_date']);
            aptBuilder.utils.makeBool(item, ['__is_incomplete']);
        },
        restize             : function (item) {
            aptBuilder.utils.makeString(item, ['registration_date']);

        },
        responseInterceptors: [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    sellerBuilder.model.normalize(item);
                    item._selectorTitle = item.name;
                    return item;
                }
            }
        ],
        requestInterceptors : [
            {
                operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
                callback : function (item) {
                    sellerBuilder.model.restize(item);
                    return item;
                }
            }
        ],
        methods             : {
            element   : [
                {name: 'getOverviewProfile', httpMethod: 'get', route: 'overviewProfile'}
                //{name: 'getOverview', httpMethod: 'get', route: 'overview'}
            ],
            collection: null
        }
    },
    service     : {
        methods: {
            getOverviewProfile: function (item_id) {
                return this.model.one(item_id).getOverviewProfile();
            },
            addQuickSeller    : function () {

                var $templateCache = this.$injector.get('$templateCache');
                var dialogs        = this.$injector.get('dialogs');
                var aptTempl       = this.$injector.get('aptTempl');

                $templateCache.put('app001/seller/directives/form/form-quick.html',
                    '<div data-apt-seller-form data-view-type="quick" data-stay="false"></div>');
                dialogs.create('app001/seller/directives/form/form-quick.html', [
                    '$scope',
                    '$uibModalInstance',
                    'NotifyingService',
                    function ($scope, $uibModalInstance, NotifyingService) {

                        NotifyingService.subscribe($scope, sellerBuilder.domain + ':added', function () {
                            $uibModalInstance.close();
                        });

                    }], undefined, aptTempl.appConfig.defaults.dialogs.edit);
            }

        }


    },
    form        : {
        controller: function ($injector, $scope, builder) {

            var vm         = this;
            var $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                service    = $injector.get(sellerBuilder.getServiceName('service')),
                model      = $injector.get(sellerBuilder.getServiceName('model'));
            var sellerType = service.vars.sellerType || aptUtils.getUrlSearchParamValue('sellerType') || 'person';

            vm.sellerFormType = vm.sellerFormType || sellerType;

            vm.selectQuickSellerFormType = selectQuickSellerFormType;
            vm.sellerQuickFormType       = null;
            function selectQuickSellerFormType(data) {
                var type = data.name;

                if (!_.has(vm.form.data, 'quickAddressData')) {
                    vm.form.data.quickAddressData = {};
                } else {
                    aptUtils.nullifyObjectProperties(vm.form.data.quickAddressData);
                }

                if (!_.has(vm.form.data, 'quickContactData')) {
                    vm.form.data.quickContactData = {};
                } else {
                    aptUtils.nullifyObjectProperties(vm.form.data.quickContactData);
                }

                switch (type) {
                    case 'person':
                        vm.sellerQuickFormType       = type;
                        vm.form.data.quickPersonData = {};
                        if (_.has(vm.form.data, 'quickEntityData')) {
                            delete vm.form.data.quickEntityData;
                        }
                        break;
                    case 'entity':
                        vm.sellerQuickFormType       = type;
                        vm.form.data.quickEntityData = {
                            business_name: null
                        };
                        if (_.has(vm.form.data, 'quickPersonData')) {
                            delete vm.form.data.quickPersonData;
                        }
                        break;
                }

            }


            loadFilter();

            var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
                loadFilter();
            });

            $scope.$on('$destroy', function () {
                listener();
            });


            function loadFilter() {
                var _sellerType   = service.vars.sellerType || aptUtils.getUrlSearchParamValue('sellerType') || 'person';
                vm.sellerFormType = _sellerType;
            }

        }
    },
    beforeAddNew: function ($injector, $scope, builder) {
        var dialogs        = $injector.get('dialogs');
        var $templateCache = $injector.get('$templateCache');
        var $q             = $injector.get('$q');
        var $timeout       = $injector.get('$timeout');
        var aptTempl       = $injector.get('aptTempl');
        var service        = $injector.get(builder.getServiceName('service'));
        var defer          = $q.defer();
        var vm             = this;

        $timeout(function () {
            $templateCache.put(sellerBuilder.getPath('cache') + '/sellerTypeSelectorPopup',
                // '<apt-panel class="no-margin"><apt-panel-title><span translate>Select Type</span></apt-panel-title>' +
                '<apt-seller-type-selector on-completed="onCompleted(data)"></apt-seller-type-selector>' +
                    // '</apt-panel>' +
                '');
            dialogs.create(sellerBuilder.getPath('cache') + '/sellerTypeSelectorPopup', [
                '$scope',
                '$uibModalInstance',
                function ($scope, $uibModalInstance) {
                    // $uibModalInstance.close();
                    // $scope.data        = {type: null};
                    $scope.onCompleted = function (data) {

                        service.vars.sellerType = data.type;
                        $uibModalInstance.close();
                        defer.resolve();
                    };

                }], undefined, aptTempl.appConfig.defaults.dialogs.confirm);
        });
        return defer.promise;
    },
    list        : {

        rowMenu: function ($injector, vm) {

            var Menu           = $injector.get('aptMenu');
            var SerllerService = $injector.get(sellerBuilder.getServiceName('Service'));

            var rowMenu = Menu.Item({
                name   : 'row-menu',
                'class': 'btn-group-xs'
            });


            var menuItemEdit   = Menu.Item({
                text     : 'Edit',
                translate: true,
                icon     : 'icon-pencil',
                'class'  : 'dropdown-toggle btn-default',
                click    : function (item) {

                    if (_.isNull(item.entity_id)) {
                        SerllerService.vars.sellerType = 'person';
                    }
                    if (_.isNull(item.person_id)) {
                        SerllerService.vars.sellerType = 'entity';
                    }

                    SerllerService.edit(item, {popup: true, stay: true});
                }
            });
            var menuItemDelete = Menu.Item({
                text   : 'Delete',
                icon   : 'icon-close2',
                'class': 'btn-danger',
                click  : function (item) {
                    SerllerService.delete(item);
                }
            });

            rowMenu.addChild(menuItemEdit);
            rowMenu.addChild(menuItemDelete);

            return rowMenu;
        },


        controller: function ($injector, $scope, builder) {

            var vm         = this,
                $rootScope = $injector.get('$rootScope'),
                aptUtils   = $injector.get('aptUtils'),
                sellerType = aptUtils.getUrlSearchParamValue('sellerType') || 'person',
                service    = $injector.get(builder.getServiceName('service')),
                model      = $injector.get(builder.getServiceName('model'));
            if (!vm.filter) {
                vm.filter = {};
            }

            loadFilter();

            var listener = $scope.$on('$locationChangeSuccess', function (event, newUrl) {
                loadFilter();
                vm.reload();
            });

            $scope.$on('$destroy', function () {
                listener();
            });


            function loadFilter() {
                var _filter     = angular.fromJson(aptUtils.getUrlSearchParamValue('filter'));
                var _sellerType = aptUtils.getUrlSearchParamValue('sellerType') || 'person';

                if (_filter) {
                    aptUtils.removeAndMerge(vm.filter, _filter);
                }

                if (_sellerType) {
                    angular.merge(vm.filter, {
                        sellerType: _sellerType
                    });
                }
            }
        }
    },
    layout      : {
        templConfig: {
            showSidebarLeft: true
        }
    }
});

sellerBuilder.generate();
