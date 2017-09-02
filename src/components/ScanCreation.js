define([
    'dojo/when',
    '../components/LoaderMixin',
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
    'dojo/text!./templates/ScanCreate.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css'
],function (when, LoaderMixin, FileUploader, Dialog, on, domClass, Memory, StoreContainer, List, Container, Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {

    var Image= declare([WidgetBase,TemplatedMixin],{
        templateString:"<div class='photo'><img data-dojo-attach-point='imageNode'></div>",
        _setImageAttr:function (image) {
            this.imageNode.src = image || require.toUrl('angrui/css/images/hotel.jpg');
        }
    })


    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:scancreateTemplate,
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
            this.imgList = new StoreContainer({
                insertChildIndex:-1,
                // store: new Memory({data:scan.photos}), // a dstore collection
                renderItem: function (item) {
                    return new Image({
                        image:item.image,
                        name:item.name
                    });
                }
            },this.imgList);
            this.imgList.startup();

        },
        refresh:function () {
            var _t=this;
            var p = when(this.scanId && Stores.scans.get(this.scanId)).then(function (scan) {
                return _t.imgList.setStore(new Memory({data:scan.photos}))
            })
            this._requestLoader(p)

        },
        upload:function(){

        },
        addFile:function(){

        },
        selectFiles:function(){

        },
        startProcess:function(){
            //TODO disable when have no scanId
            var _t=this;
            var p = Stores.scans.startProcess(this.scanId).then(function () {
                _t.finished();
            });
            this._requestLoader(p)
        },
        finished:function () {

        }

    })
})