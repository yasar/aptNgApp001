/**
 * Created by engin on 26.09.2016.
 */
var saleitemBuilder = new aptBuilder({
    domain : 'saleitem',
    package: 'app001',
    icon   : 'icon-basket',
    title  : 'Product',
    menu   : {
        target: 'enterprise'
    },
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        managerDirective : true,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : false
    },
    //onRun  : function ($injector) {
    //    var hotkeys    = $injector.get('hotkeys');
    //    var $rootScope = $injector.get('$rootScope');
    //    hotkeys.bindTo($rootScope)
    //        .add({
    //            combo      : 'ctrl ctrl s',
    //            description: 'Product Finder',
    //            callback   : function () {
    //                window.alert('open');
    //            }
    //        });
    //},
    // form   : {
    //     title     : 'Saleitem',
    //     controller: function ($injector, $scope, builder) {
    //         var vm = this;
    //
    //         // if(_.has(vm,'params.selectedType')){
    //         //     vm.params.selectedType =
    //         // }
    //     }
    // },
    manager: {
        controller: function ($injector, $scope, builder) {
            var vm               = this;
            var NotifyingService = $injector.get('NotifyingService');

            NotifyingService.subscribe($scope, builder.domain + ':updated', function (event, data) {
                vm.item = data.data;
            });
        }
    },
});


