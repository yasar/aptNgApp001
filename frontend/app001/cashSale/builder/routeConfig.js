_.merge(cashSaleBuilder.routeConfig, {
    others: [
        {
            name         : cashSaleBuilder.segment('list'),
            url          : cashSaleBuilder.url(''),
            access       : {
                permission: [cashSaleBuilder.permission('r')]
            },
            ncyBreadcrumb: {
                label: 'Cash Sale'
            },
            template     : '<div data-apt-cash-sale-manager ></div>'
        }
    ]
});