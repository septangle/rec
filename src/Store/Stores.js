define([
    'dojo/_base/lang',
    './data/CityData',
    'dojo/store/Memory',
    'dojo/_base/declare',
    './'+dojoConfig.storeType+'/UserStore',
    './'+dojoConfig.storeType+'/ScanStore',
    './'+dojoConfig.storeType+'/Balance',
    'exports'

],function (lang, CityData, Memory, declare, UserStore, ScanStore, Balance, exports) {

    var cityJson = CityData;


    lang.mixin(exports, {
        users:new UserStore(),


        province:new Memory({
            getValue:function(item){
                return item.id
            },
            data: cityJson.filter(function (item) {
                return parseInt(item.item_code)%10000 == 0
            }).map(function (item) {
                return { name:item.item_name, id:item.item_code}
            })
        }),

        getCities: function(val){
            var code = val;
            return new Memory({
                data: cityJson.filter(function (item) {
                    return parseInt(item.item_code) - code > 0 && parseInt(item.item_code) - code < 10000
                }).map(function (item) {
                    return { name:item.item_name,id:item.item_code }
                })
            })
        },

        scans : new ScanStore(),

        balance:new Balance()

        

    })
    return exports;
})