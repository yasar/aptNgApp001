(function () {

    angular.module("apt.app001.route", [])
        .config([
            '$routeSegmentProvider',
            '$routeProvider',
            function ($routeSegmentProvider, $routeProvider) {
                var segmentConf = {
                    /**
                     *
                     * IMPORTANT
                     *
                     * Dont use `template` itself, rather use `templateUrl`
                     * it will cause template being not  loaded on initial page load.
                     *
                     */
                    // template: '<div app-view-segment="2"></div>'
                    templateUrl: 'app001/layout.tpl.html'
                };

                if(_.has($routeSegmentProvider,'segments.main.children.app001')){
                    _.set($routeSegmentProvider,'segments.main.children.app001.params', segmentConf);
                } else {
                    $routeSegmentProvider.within('main').segment('app001', segmentConf);
                }
            }
        ])
    ;
})();
