define([
    'dojo/request',
    'dstore/Memory',
    'dojo/_base/declare',
],function (request, Memory, declare) {
    return declare([],{

        headers: { 'Content-Type': 'application/json' },

        auth:function(user){
            return request.post(dojoConfig.basePath+"/member/login.do",{headers:this.headers,data:JSON.stringify({photoMemberDto:user})}).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.photoMemberDto;
            })
        },
        register:function(user){
            return request.post(dojoConfig.basePath+"/member/register.do",{headers:this.headers,data:JSON.stringify({photoMemberDto:user})}).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.photoMemberDto;
            })
        },
    })
})