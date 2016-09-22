/**
 * Created by unal on 23.03.2016.
 */


(function () {
    var builder = cardBuilder;
    angular.module(builder.getModuleName()).controller(builder.getControllerName('new'), Controller);

    Controller.$inject = ['$scope', 'aptUtils', 'aptTempl', 'NotifyingService'];

    function Controller($scope, aptUtils, Templ, NotifyingService) {
        var builder = cardBuilder;

        Templ.config.showSidebarLeft = false;

        NotifyingService.subscribe($scope, builder.domain + '.formCanceled', function () {
            aptUtils.goto({
                segment: 'main.app001.card.list'
            });
        });
    }
})();