/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPackageBuilder.form,{
    controller: function ($injector, $scope, builder) {
        var $routeSegment = $injector.get('$routeSegment');
        var vm            = $scope[builder.getControllerAsName('form')];


    }
})