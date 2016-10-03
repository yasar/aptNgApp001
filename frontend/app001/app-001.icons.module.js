/**
 * Created by yasar on 29.08.2016.
 */

(function () {

    angular.module("apt.app001.icons", [])
        .config([
            'aptTemplProvider',
            function (aptTempl) {

                angular.merge(aptTempl.appConfig, {
                    iconLib : 'icomoon',
                    defaults: {
                        icons : {
                            icomoon: {
                                credit        : 'minus-circle2',
                                debt          : 'plus-circle2',
                                'set-discount': 'stats-decline2'
                            }
                        },
                        colors: {
                            /**
                             * check app002 for usage sample
                             */
                        }
                    }
                });
            }
        ])
    ;
})();
