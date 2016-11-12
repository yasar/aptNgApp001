/**
 * Created by engin on 26.09.2016.
 */
var tillBuilder = new aptBuilder({
    domain : 'till',
    package: 'app001',
    icon   : 'icon-station',
    create : {
        listDirective    : true,
        formDirective    : false,
        selectorDirective: true,
        moduleService    : true,
        modelService     : true
    },
});

