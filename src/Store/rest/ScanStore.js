define(['dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (Cache, Rest, declare) {
    return declare([Rest,Cache],{
        target:dojoConfig.basePath+"/scans/",
    })
})