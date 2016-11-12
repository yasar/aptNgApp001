/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPriceBuilder.list,{
    rowMenu: function ($injector, vm) {
        var Menu     = $injector.get('aptMenu');
        var restOp   = $injector.get('restOperationService');
        var service  = $injector.get(saleitemPriceBuilder.getServiceName('service'));
        var aptUtils = $injector.get('aptUtils');

        var rowMenu = Menu.Item({
            name   : 'row-menu',
            'class': 'btn-group-xs'
        });

        var menuItemEdit = Menu.Item({
            text     : 'Edit',
            translate: true,
            icon     : 'icon-pencil',
            'class'  : 'dropdown-toggle btn-default',
            show     : function (item) {
                return item.is_price_inuse == false;
            },
            click    : function (item) {
                service.edit(item, {popup: true, stay: true, suffix: 'form'});
            }
        });

        var menuItemDelete = Menu.Item({
            text     : 'delete',
            icon     : 'icon-trash-alt',
            translate: true,
            'class'  : 'btn-danger',
            show     : function (item) {
                return item.is_price_inuse == false;
            },
            click    : function (item) {
                restOp.delete({type: 'saleitemPrice', data: item, allData: service.getRepo()});
            }
        });

        var menuItemSetPrimary = Menu.Item({
            text     : 'Set Primary',
            translate: true,
            icon     : 'icon-podium',
            'class'  : 'btn-danger',
            show     : function (item) {
                if (item.price_type == 'purchase' || item.is_primary == true || item.is_active == false) {
                    return false;
                } else {
                    return true;
                }
            },
            click    : function (item) {
                var waitConf = {
                    progress: 10
                };
                aptUtils.showWait(waitConf);
                service.setPrimary(item.saleitem_price_id).then(function (data) {
                    if (data) {
                        waitConf.progress = 80;
                        service.loadRepo({saleitem_id: item.saleitem_id}, false, {
                            onLoaded: function () {
                                waitConf.progress = 100;
                            }
                        });
                    } else {
                        waitConf.progress = 100;
                    }
                });
            }
        });

        rowMenu.addChild(menuItemEdit);
        rowMenu.addChild(menuItemDelete);
        rowMenu.addChild(menuItemSetPrimary);
        return rowMenu;
    },

    controller: function ($injector, $scope, builder) {
        var vm      = this;
        var service = $injector.get(builder.getServiceName('service'));

        vm.addNew = function () {
            service.addNew({
                popup      : true,
                add_before : true,
                confirm    : {
                    required: true
                },
                initialData: {
                    saleitem_id: _.get(vm, 'filter.saleitem_id')
                }
            });
        };
    }
})