/**
 * Created by burak on 26.09.2016.
 */
_.merge(cashSaleBuilder.service,{
    methods: {
        getWidgetDataForDashboard: function () {
            return this.model.getWidgetDataForDashboard();
        }
    }
});
