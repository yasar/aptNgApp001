var activityFollowUpBuilder = new aptBuilder({
    domain   : 'activityFollowUp',
    package  : 'app002',
    icon     : 'icon-loop',
    title    : 'Activity Follow Up',
    authorize: true,
    menu     : {
        order: 15
    },
    create   : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : true
    }
});