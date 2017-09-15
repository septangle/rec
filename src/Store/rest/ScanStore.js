define(['dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (request, Cache, Rest, declare) {
    return declare([],{

        headers: { 'Content-Type': 'application/json' },

        addScan:function (data) {
            return request.post(dojoConfig.basePath+"/engine/addPhotos.do",
                {
                    handleAs:'json',
                    data:data //TODO
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.panoramaEngineDto;
            })
        },

        removeScan:function (id) {
            return request.post(dojoConfig.basePath+"/order/deleteOrderById.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                    data:JSON.stringify({orderDto:{
                        id:id
                    }})
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.orderDto;
            })
        },

        getStatus:function(benacoScanId){
            return request.post(dojoConfig.basePath+"/engine/queryScanStatus.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                    data:JSON.stringify({panoramaEngineDto:{
                        benacoScanId:benacoScanId
                    }})
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.panoramaEngineDto;
            })
        },

        getScans:function (status) {
            return request.get(dojoConfig.basePath+"/order/getCurrMemberScan.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.processDtoList;
            })
        },
        startProcess:function(benacoScanId){
            return request.post(dojoConfig.basePath+"/engine/startProcessing.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                    data:JSON.stringify({panoramaEngineDto:{
                        benacoScanId:benacoScanId
                    }})
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.panoramaEngineDto;
            })
        },
    })
})