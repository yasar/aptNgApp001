/**
 * Created by burak on 26.09.2016.
 */
var clientCardBuilder = new aptBuilder({
    domain : 'clientCard',
    package: 'app001',
    icon   : 'icon-vcard',
    title  : 'Client Card',
    create : {
        listDirective    : true,
        formDirective    : true,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true
    },
});


