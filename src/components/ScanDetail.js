define([
    '../components/FileUploader',
    'dijit/Dialog',
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
        templateString:"<div class='photo'><img src='${image}'></div>"
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
            this.inherited(arguments)
            this.refresh();
        },
        refresh:function () {
            var _t=this;
            if(this.scanId){
                Stores.scans.get(this.scanId).then(function (scan) {
                    var list = new StoreContainer({
                        insertChildIndex:-1,
                        store: new Memory({data:scan.photos}), // a dstore collection
                        renderItem: function (item) {
                            return new Image(item);
                        }
                    },_t.imgList);
                    _t.scanTitle.set('value',scan.title);
                    list.startup();
                });
            }
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
        }

    })
})