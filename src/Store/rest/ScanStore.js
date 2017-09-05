define(['dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (request, Cache, Rest, declare) {
    return declare([Rest],{
        target:dojoConfig.basePath+"/scan/",
        addImage:function(scanId,formData){
            return request(dojoConfig.basePath+"/scan/"+scanId+"/images",{
                    method: 'post',
                    handleAs: "json",
                    data:formData
                })
        },
        startProcess:function(scanId){
            return request(dojoConfig.basePath+"/scan/"+scanId+"/startProcess",{
                method: 'post',
                handleAs: "json",
            })
        },
        upload:function(form,type){

        }
    })
})