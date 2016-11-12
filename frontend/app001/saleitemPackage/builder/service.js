/**
 * Created by engin on 26.09.2016.
 */
_.merge(saleitemPackageBuilder,{

    init: function ($injector) {
        this.repo = $injector.get(couponRequirementBuilder.getServiceName('service')).getRepo;
    },

    methods: {

        addPackageItem: function (item) {
            var _this = this;
            _this.repo.push(item);
        }
    }


})