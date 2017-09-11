define(['dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (request, Cache, Rest, declare) {
    return declare([],{

        addScan:function (data) {
            return request.post(dojoConfig.basePath+"/engine/addPanoramicPhotos.do",
                {
                    headers:this.headers,
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
            return request.post(dojoConfig.basePath+"/photoscan/deletePhotoScan.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                    data:JSON.stringify({photoScanDto:{
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
            return request.get(dojoConfig.basePath+"/photoscan/getCurrMemberScan.do",
                {
                    headers:this.headers,
                    handleAs:'json',
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
                return data.photoScanDtoList;
            })
        },
        startProcessing:function(benacoScanId){
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