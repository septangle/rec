define([
    'dojo/when',
    'dojo/request',
    'dstore/Memory',
    'dojo/_base/declare',
],function (when, request, Memory, declare) {
    return declare([],{

        headers: { 'Content-Type': 'application/json' },

        auth:function(user){
            return request.post(dojoConfig.basePath+"/member/login.do",{
                headers:this.headers,
                handleAs:'json',
                data:JSON.stringify({memberDto:user})
            }).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.memberDto;
            })
        },
        register:function(user){
            return request.post(dojoConfig.basePath+"/member/register.do",{
                headers:this.headers,
                handleAs:'json',
                data:JSON.stringify({memberDto:user})
            }).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.memberDto;
            })
        },
        current:function(){
            return request.get(dojoConfig.basePath+"/member/getCurrMember",{
                headers:this.headers,
                handleAs:'json',
            }).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.memberDto;
            })
        },
        logout:function(){
            return request.post(dojoConfig.basePath+"/member/logout",{
                headers:this.headers,
                handleAs:'json',
            });
        },
        getPrice:function () {
            return request.get(dojoConfig.basePath+"/member/getPrice.do",{
                headers:this.headers,
                handleAs:'json',
            }).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.priceDto;
            })
        }
    })
})