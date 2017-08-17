define([
    'dojo/request',
    'dstore/Memory',
    'dojo/_base/declare',
],function (request, Memory, declare) {
    return declare([],{

        headers: { 'Content-Type': 'application/json' },

        auth:function(user){
            return request.post("/photo/member/queryPhotoMember.do",{headers:this.headers,data:JSON.stringify(user)})
        },
        register:function(user){
            return request.post("/photo/member/addPhotoUsers.do",{headers:this.headers,data:JSON.stringify(user)})
        },
    })
})