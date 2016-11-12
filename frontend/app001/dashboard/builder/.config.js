/**
 * Created by engin on 26.09.2016.
 */
var dashboardBuilder = new aptBuilder({
    domain      : 'dashboard',
    dependencies: ['apt.calendar', 'apt.atomFeeds', 'aptAtomFeedsTemplates'],
    package     : 'app001',
    title       : 'Dashboard',
    icon        : 'icon-home2',
    menu        : {
        order: 0
    },
    create      : {
        listDirective    : false,
        formDirective    : false,
        selectorDirective: false,
        managerDirective : false,
        moduleService    : true,
        modelService     : false,
        layoutController : true
    },


});

