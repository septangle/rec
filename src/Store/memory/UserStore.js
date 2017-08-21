define([
    'dstore/Memory',
    'dojo/_base/declare',
],function (Memory, declare) {
    return declare([Memory],{
        data:[
            {
                tel :'demo',
                password: '123',
            }
        ],
        auth:function(args){
            return this.filter({
                tel :args.tel,
                password: args.password,
            }).fetch().then(function (users) {
                if(users.length){
                    return users[0]
                }else{
                    throw 'auth failed'
                }
            })
        },
        register:function(user){
            return this.put(user);
        }
    })
})