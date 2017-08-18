define([
    'dstore/Memory',
    'dojo/_base/declare',
    '../../common/Utils'
],function (Memory, declare,Utils) {
    return declare([Memory],{
        data:[
            {
                id:'aaaa-bbbb-cccc',
                title:'demo',
                thumbnail:'',
            }
        ],
        put:function(object,options){
            var id = this.getIdentity(object);
            if (!id) {
                this._setIdentity(object, ('id' in options) ? options.id : Utils.generateUUID());//
            }
        }
    })
})