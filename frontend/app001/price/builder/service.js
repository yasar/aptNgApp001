/**
 * Created by engin on 26.09.2016.
 */
_.merge(priceBuilder.service,{
    //edit   : {
    //    before: function ($injector, data, popup) {
    //        // var restOp = $injector.get('restOperationService');
    //        // restOp.edit({
    //        //     type  : priceBuilder.domain,
    //        //     suffix: 'manager',
    //        //     data  : data,
    //        //     popup : popup
    //        // });
    //
    //        /**
    //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
    //         */
    //        return false;
    //    }
    //},
    methods: {
        getSections         : function () {
            return this.model.getSections();
        },
        getTemplateAndFields: function (section) {
            return this.model.one(section).getTemplateAndFields();
        },
    }


})