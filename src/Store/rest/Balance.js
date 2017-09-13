define(['dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare'],function (request, Cache, Rest, declare) {
    return declare([],{
        balance:function () {
            return request.get(dojoConfig.basePath+"/balance/balance.do",
                {
                    handleAs:'json'
                })
        },
        recharge:function (data) {
            return request.post(dojoConfig.basePath+"/balancetrace/recharge.do",
                {
                    headers: { 'Content-Type': 'application/json' },
                    handleAs:'json',
                    data:{balanceTraceDto:data}
                }
            )
        }
    })
})