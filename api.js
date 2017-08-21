var request = require('request');;
var rq = require('request-promise');;
var path =require('path');
var fs = require('fs');
var Q  = require('q');

var baseUrl = 'https://beta.benaco.com/api/beta';
var apiKey = "3c7c6941-2204-4ee7-a4b5-0981e0e6e09c";




module.exports= {
    addScan : function (title) {
        console.log('adding scan',title);
        return rq(
            {
                method: 'POST',
                uri: baseUrl+'/scans/new',
                body: {
                    key: apiKey,
                    title: title
                },
                json: true
            }
        )
    },
    addPics:function(pics){
        console.log('adding pics',pics);

        var formData = {
            key: '"'+apiKey+'"',
        };

        pics.forEach(function (item,index) {
            formData["photo"+(index+1)]= fs.createReadStream(item);
        })

        return rq(
            {
                method: 'POST',
                uri:baseUrl+'/scans/id/'+args.scanId+'/add-photos',
                form: formData
            }
        )

    },
    startProcessing: function (scanId) {

        console.log('start processing scan',scanId);
        return rq(
            {
                method: 'POST',
                uri: baseUrl+'/scans/id/'+scanId+'/start-processing',
                body: {
                    key: apiKey
                },
                json: true
            }
        )
    },
    setPreview: function(scanId){

        console.log('set preview of scan',scanId);
        return rq(
            {
                method: 'POST',
                uri: baseUrl+'/scans/id/'+scanId+'/set-preview',
                body: {
                    key: apiKey,
                    isPreview:true
                },
                json: true
            }
        )
    },
    scanStatus: function (scanId) {
        console.log('get status of scan',scanId);
        return rq(
            {
                method: 'POST',
                uri: baseUrl+'/scans/id/'+scanId+'/status',
                body: {
                    key: apiKey
                },
                json: true
            }
        )
    }
}