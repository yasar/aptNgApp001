/**
 * Created by murat on 08.03.2016.
 */
(function () {
    return;
    var domain        = 'activityFollowUp',
        path          = 'app002/' + domain + '/directives/form',
        tpl           = 'form',
        directiveName = _.upperFirst(domain) + 'Form';

    angular
        .module('apt.app002.' + domain)
        .directive('apt' + directiveName, fn);


    fn.$inject = ['$timeout'];
    function fn($timeout) {
        var directiveObj = {
            restrict        : 'A', // ACME
            scope           : {},
            bindToController: {
                item: '=?'
            },
            templateUrl     : path + '/' + tpl + '.tpl.html',
            controller      : controllerFn,
            link            : linkFn,
            controllerAs    : 'vm' + directiveName
        };

        function linkFn($scope, elem, attrs) {
            $scope.updateCounts = function () {
                $timeout(function () {
                    elem.find('.report-holder .panel').each(function (key, _panel) {
                        var panel   = angular.element(_panel);
                        // panel.removeClass('panel-default');
                        var heading = panel.find('.panel-heading');
                        if (heading.find('.badge').length == 0) {
                            heading.append('<div class="heading-elements">' +
                                           ' <ul class="icons-list">' +
                                           ' <li><span class="badge pull-right"></span></li>' +
                                           ' </ul>' +
                                           ' </div>');
                        }
                        var badge = heading.find('.badge');

                        var nulls = 0, total = 0;
                        total     = panel.find('input').each(function (key, input) {
                            var val = angular.element(input).val();
                            if (input.type == 'checkbox' && !input.checked) {
                                nulls++;
                            } else if (val == null || val == '') {
                                nulls++;
                            }
                        }).length;

                        badge.html((total - nulls) + '/' + total);

                        if (nulls == 0) {
                            // panel.removeClass('panel-warning').addClass('panel-success');
                            badge.removeClass('bg-warning').addClass('bg-success');
                        } else {
                            // panel.removeClass('panel-success').addClass('panel-warning');
                            badge.removeClass('bg-success').addClass('bg-warning');
                        }
                    });
                }, 300);
            };
        }

        return directiveObj;
    }

    controllerFn.$inject = ['ActivityFollowUpService', 'ActivityFollowUpModel', 'aptUtils', '$scope'];

    function controllerFn(ActivityFollowUpService, ActivityFollowUpModel, aptUtils, $scope) {

        var vm  = this;
        vm.form = new aptUtils.form('activityFollowUp', vm.item);

        $scope.progress = 0;
        // $scope.$watch('vmActivityFollowUpForm.item', function (item) {
        $scope.$watch('vmActivityFollowUpForm.form.data', function (_item) {
            var nulls = 0;
            var total = 0;
            var item  = _item;

            if (_item.restangularized) {
                item = _item.plain();
            }

            angular.forEach(item, function (val, prop) {

                if (['city', 'entity', 'country', 'district'
                        , 'mast_id', 'mast_name', 'mast_subtype', 'mast_type'
                        , 'neighbourhood', 'subentity', 'activity_follow_up_id'
                        , 'uses_enterprise_id'].indexOf(prop) !== -1) {
                    return;
                }

                if (_.isFunction(val)) {
                    return;
                }

                total++;
                if (val == null || val == '' || val == false) {
                    nulls++;
                }
            });

            $scope.progress = Math.floor(100 - 100 * nulls / total);

            $scope.updateCounts();
        }, true);
    }

})();