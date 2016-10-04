/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemBuilder.service,{


    methods: {
        getByBarcode: function (barcode) {
            return this.model.getByBarcode({barcode: barcode});
        },

        getMostSoldSaleitem: function (filter) {
            return this.model.getMostSoldSaleitem(filter);
        },

        /**
         * editConf ile popup suffix stay ayarlandı
         */
        //edit   : {
        //    before: function ($injector, data, popup) {
        //        var restOp = $injector.get('restOperationService');
        //        restOp.edit({
        //            type  : saleitemBuilder.domain,
        //            suffix: 'manager',
        //            data  : data,
        //            popup : popup
        //        });
        //
        //        /**
        //         * return false so that createModuleService::edit() function wont try to execute its own restOp.edit()
        //         */
        //        return false;
        //    }
        //},
    }


})