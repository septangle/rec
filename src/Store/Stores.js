define([
    './data/CityData',
    'dojo/store/Memory',
    'dojo/_base/declare',
    './'+dojoConfig.storeType+'/UserStore',
    './'+dojoConfig.storeType+'/ScanStore'


],function (CityData,Memory, declare, UserStore,ScanStore) {

    var cityJson = CityData;


    return {
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
            //TODO
            var code = cityJson.filter(function (item) {
                return item.item_name==val;
            })[0].item_code;


            return new Memory({
                data: cityJson.filter(function (item) {
                    return parseInt(item.item_code) - code > 0 && parseInt(item.item_code) - code < 10000
                }).map(function (item) {
                    return { name:item.item_name,id:item.item_code }
                })
            })
        },

        scans : new ScanStore(),


        

    }
})