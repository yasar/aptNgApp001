/**
 * Created by burak on 26.09.2016.
 */


var cardBuilder = new aptBuilder({
    domain : 'card',
    title  : 'Cards',
    package: 'app001',
    icon   : 'icon-credit-card',
    menu   : {
        target: 'enterprise'
    },
    disable:{
        addNew:true,
        edit:true
    },
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true,
        layoutController : true
    },
});



