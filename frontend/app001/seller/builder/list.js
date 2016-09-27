/**
 * Created by engin on 26.09.2016.
 */
_.merge(sellerBuilder.list,{

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
})