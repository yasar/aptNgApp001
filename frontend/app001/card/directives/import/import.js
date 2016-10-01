/**
 * Created by yasar on 01.10.2016.
 */


(function () {
    var _name   = 'import';
    var builder = cardBuilder;


    angular.module(builder.getModuleName())
        .directive(builder.getDirectiveName(_name), Directive);

    function Directive() {
        return {
            restrict        : 'EA',
            controller      : Controller,
            controllerAs    : builder.getControllerAsName(_name),
            templateUrl     : builder.getPath(_name) + '/' + _name + '.tpl.html',
            scope           : true,
            bindToController: {}
        }
    }

    Controller.$inject = ['$injector'];
    function Controller($injector) {

        var vm         = this;
        var $rootScope = $injector.get('$rootScope');
        var aptUtils   = $injector.get('aptUtils');
        var service    = $injector.get(builder.getServiceName('service'));
        var model      = $injector.get(builder.getServiceName('model'));

        vm.import = importFn;
        vm.form   = new aptUtils.form('cardImport', {}, {
            stay     : true,
            mute     : true,
            integrate: false
        });

        function importFn() {
            vm.form.isSaving = true;
            model.import(vm.form.data).then(function (data) {
                if (data == 'false') {
                    aptUtils.showError('Error occurred', 'An unknown error occurred.');
                    vm.form.isSavingFailed = true;
                }
                vm.form.isSaving = false;
            }, function () {
                vm.form.isSaving       = false;
                vm.form.isSavingFailed = true;
            });
        }


    }
})();