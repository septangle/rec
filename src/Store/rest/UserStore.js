define([
    'dojo/when',
    'dojo/request',
    'dstore/Memory',
    'dojo/_base/declare',
],function (when, request, Memory, declare) {
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
        current:function(){
            return request.get(dojoConfig.basePath+"/member/current",{headers:this.headers}).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.photoMemberDto;
            })
        },
        logout:function(){
            return request.post(dojoConfig.basePath+"/member/logout",{headers:this.headers});
        }
    })
})