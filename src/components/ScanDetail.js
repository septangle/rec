define([
    '../components/FileUploader',
    '../components/Dialog',
    'dojo/on',
    'dojo/dom-class',
    'dstore/Memory',
    '../components/StoreContainer',
    'dgrid/List',
    'dijit/_Container',
    '../Store/Stores',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ScanDetail.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css'
],function (FileUploader, Dialog, on, domClass, Memory, StoreContainer, List, Container, Stores, WidgetsInTemplateMixin, scandetailTemplate, TemplatedMixin, WidgetBase, declare) {

    var Image= declare([WidgetBase,TemplatedMixin],{
        templateString:"<div class='photo'><img src='${image}'></div>",
    })


    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scandetailTemplate,
        plusIcon:require.toUrl('angrui/css/images/plus.png'),
        _setMultiAttr: function(val) {
            this.uploadFile.multiple = this.multi = val;
        },
        postCreate:function () {
            this.inherited(arguments)

        },
        startup:function(){
            this.inherited(arguments);
            var _t=this;
            Stores.scans.get(this.scanId).then(function (scan) {
                _t.imgList = new StoreContainer({
                    insertChildIndex:-1,
                    store: new Memory({data:scan.photos}), // a dstore collection
                    renderItem: function (item) {
                        return new Image({
                            image:item.image || require.toUrl('angrui/css/images/hotel.jpg'),
                            name:item.name
                        });
                    }
                },_t.imgList);
                _t.scanTitle.set('value',scan.title);
                _t.imgList.startup();
            });
        },
        refresh:function () {
            var _t=this;
            Stores.scans.get(this.scanId).then(function (scan) {
                _t.imgList.setStore(new Memory({data:scan.photos}))
            })
        },
        upload:function(){

        },
        addFile:function(){

        },
        openDialog:function(){
            var _t=this;
            var dialog = new Dialog({
                title:"上传图片",
                style:{width:'400px'},
                content: new FileUploader({
                    multi: true,
                    finished: function() {
                        dialog.hide();
                        _t.refresh();
                    },
                    upload: function(f) {
                        var formData = new FormData();
                        formData.append("file", f);
                        return Stores.scans.addImage(_t.scanId,formData);
                    },
                    cancel: function() {
                        dialog.hide();
                    },
                })
            });
            dialog.show();
        },
        startProcess:function(){

        }

    })
})