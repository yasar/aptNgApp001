(function () {

    angular.module("apt.app001.route", [])
        .config([
            '$routeSegmentProvider',
            '$routeProvider',
            'aptTemplProvider',
            function ($routeSegmentProvider, $routeProvider, aptTempl) {
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
                    templateUrl : 'app001/layout.tpl.html',
                    controller  : Controller,
                    controllerAs: 'vmAppLayout'
                };

                if (_.has($routeSegmentProvider, 'segments.main.children.app001')) {
                    _.set($routeSegmentProvider, 'segments.main.children.app001.params', segmentConf);
                } else {
                    $routeSegmentProvider.within('main').segment('app001', segmentConf);
                }

                // var wrapper='<div card-read="vmAppLayout.parseCard($card, $readError, $tracks)"></div>';
                var wrapper = '<div card-read="vmLayout.smartNotify($card, $readError, $tracks, \'parseCard\')"></div>';
                aptTempl.layoutWrappers.push(wrapper);
            }
        ]);

    Controller.$inject = ['$injector', '$scope'];
    function Controller($injector, $scope) {
        var vm               = this;
        var NotifyingService = $injector.get('NotifyingService');
        vm.parseCard         = parseCard;

        NotifyingService.subscribe($scope, 'parseCard', function (event, args) {
            parseCard.apply(null, args);
        });

        function parseCard(card, error, tracks) {
            if (!error) {
                /*$scope.card = {
                 card: card,
                 tracks: tracks,
                 track1: tracks[0]
                 };*/

                var cardObj = {
                    data: null,
                    type: null
                };

                cardObj.data = card.substr(1, card.length - 2);

                switch (cardObj.data.length) {
                    case 5:
                    case 4:
                        cardObj.type = 'client';
                        NotifyingService.notify('cardReader:client', cardObj);
                        break;
                    default:
                        cardObj.type = 'product';
                        NotifyingService.notify('cardReader:product', cardObj);
                        break;
                }

                NotifyingService.notify('cardReader:read', cardObj);
            }
        };
    }
})();
