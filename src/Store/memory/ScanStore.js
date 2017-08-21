define([
    'dojo/Deferred',
    'dojo/_base/declare',
    'dstore/Memory'
],function (Deferred, declare, Memory) {
    return declare([Memory],{
        addImage:function(scanId,formData){
            var fileName = formData.get('file').name;

            var scan = this.getSync(scanId);
            scan.photos.push({
                name:fileName
            });
            var dfd  = new Deferred();
            var _t=this;
            var i=0;
            var itv = setInterval(function(){
                i++;
                dfd.progress({
                    loaded:i*100 //TODO
                });
                if(i>=100){
                    clearInterval(itv);
                    dfd.resolve(true/*_t.put.apply(_t,arguments)*/);
                }
            },10);
            return dfd.promise;
        },
        startProcess:function(scanId){
            var scan = this.getSync(scanId);
            scan.status= "processing";
            return this.put(scan);
        },
    })
})