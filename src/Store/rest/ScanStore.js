define(['dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (request, Cache, Rest, declare) {
    return declare([],{

        headers: { 'Content-Type': 'application/json' },

        addScan:function (data) {
            return request.post(dojoConfig.basePath+"/engine/addPanoramicPhotos.do",
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
            return request.post(dojoConfig.basePath+"/Panorama/deletePanorama.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                    data:JSON.stringify({panoramaDto:{
                        id:id
                    }})
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.photoScanDto;
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