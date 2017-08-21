define(['dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (Cache, Rest, declare) {
    return declare([Rest],{
        target:dojoConfig.basePath+"/scans/",
    })
})