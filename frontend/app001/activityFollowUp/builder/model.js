/**
 * Created by yasar on 25.09.2016.
 */

_.merge(activityFollowUpBuilder.model, {
    normalize           : function (item) {
        aptBuilder.utils.makeInt(item, ['activity_follow_up_id', 'mast_id']);
        aptBuilder.utils.makeNumber(item, ['mast_height', 'installation_duration']);
        aptBuilder.utils.makeBool(item, ['document_deed', 'document_contract', 'approval_coord', 'approval_permission', 'approval_permission2', 'supply_mast', 'supply_device', 'dispatch_foundation', 'dispatch_mast', 'dispatch_device', 'operation_foundation', 'operation_installation', 'operation_launch', 'operation_fencing', 'configuration_connection', 'configuration_setup', 'configuration_checking', 'reporting_report', 'accounting_invoice', 'tracking_report_sent', 'tracking_report_approved', 'mgm_approved', 'mgm_ftp', 'uses_enterprise_id']);
        aptBuilder.utils.makeNativeDate(item, ['tracking_report_sent_date', 'installation_date']);
    },
    restize             : function (item) {
        aptBuilder.utils.makeInt(item, ['document_deed', 'document_contract', 'approval_coord', 'approval_permission', 'approval_permission2', 'supply_mast', 'supply_device', 'dispatch_foundation', 'dispatch_mast', 'dispatch_device', 'operation_foundation', 'operation_installation', 'operation_launch', 'operation_fencing', 'configuration_connection', 'configuration_setup', 'configuration_checking', 'reporting_report', 'accounting_invoice', 'tracking_report_sent', 'tracking_report_approved', 'mgm_approved', 'mgm_ftp', 'uses_enterprise_id']);
        aptBuilder.utils.makeString(item, ['tracking_report_sent_date', 'installation_date']);
    },
    responseInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item, what, url, $injector) {
                activityFollowUpBuilder.model.normalize(item);
            }
        }
    ],

    requestInterceptors: [
        {
            operation: ['get', 'customGET', 'put', 'post', 'getList', 'customGETLIST'],
            callback : function (item, what, url, $injector) {
                activityFollowUpBuilder.model.restize(item);
            }
        }
    ],
    methods            : {
        element   : [],
        collection: null
    }
});