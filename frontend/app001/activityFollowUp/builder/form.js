/**
 * Created by yasar on 25.09.2016.
 */

_.merge(activityFollowUpBuilder.form, {
    link      : function ($injector, builder, scope, elem, attrs, ctrls) {
        var vm          = scope[builder.getControllerAsName('form')];
        var $timeout    = $injector.get('$timeout');
        vm.updateCounts = function () {
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

                    var nulls = 0;
                    var total = 0;

                    total = panel.find('input').each(function (key, input) {
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
            });
        };
    },
    controller: function ($injector, $scope, builder) {
        var vm      = this;
        vm.progress = 0;


        $scope.$watch(builder.vm('form', 'form.data'), function (_item) {
            var nulls = 0;
            var total = 0;
            var item  = _item;

            if (_item.restangularized) {
                item = _item.plain();
            }

            _.forEach(item, function (val, prop) {

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

            vm.progress = Math.floor(100 - 100 * nulls / total);

            vm.updateCounts();
        }, true);
    }
});