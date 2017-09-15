define(['dojo/when',
    'dojo/request',
    'dstore/Cache',
    'dstore/Rest',
    'dojo/_base/declare',
    '../Stores'
],function (when, request, Cache, Rest, declare,Stores) {
    return declare([],{
        balance:function (memberId) {
            return when(memberId|| Stores.users.current().then(function (data) {
                    return data.id
            })).then(function (memberId) {
                return request.post(dojoConfig.basePath+"/balance/balance.do",
                    {
                        handleAs:'json',
                        headers: { 'Content-Type': 'application/json' },
                        data:JSON.stringify({
                            "balanceDto": {
                                "memberId": memberId
                            }
                        })
                    }).then(function (data) {
                        if(data.error){
                            throw data.error
                        }
                        return data.balanceTraceDto;
                    })
            })

        },
        recharge:function (data) {
            return request.post(dojoConfig.basePath+"/balancetrace/recharge.do",
                {
                    headers: { 'Content-Type': 'application/json' },
                    handleAs:'json',
                    data:JSON.stringify({balanceTraceDto:data})
                }
            ).then(function (data) {
                if(data.error){
                    throw data.error
                }
            })
        }
    })
})