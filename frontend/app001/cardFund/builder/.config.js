var cardFundBuilder = new aptBuilder({
    domain : 'cardFund',
    title  : 'Card Fund',
    package: 'app001',
    icon   : 'icon-printer4',
    menu   : {
        target: 'accounting',
        order : 6
    },
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: false,
        moduleService    : true,
        modelService     : true,
        layoutController : true,
        routeConfig      : true
    },
   
});



