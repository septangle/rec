define([
    'dojo/dom-class',
    '../components/LoaderMixin',
    '../components/ScanDetail',
    'dojo/window',
    'dojo/dom-style',
    'dojo/on',
    'dojo/_base/lang',
    '../components/ScanCreation',
    '../components/Dialog',
    'dijit/form/Button',
    'dijit/_Container',
    '../Store/Stores',
    '../components/ScanBox',
    'dijit/layout/LayoutContainer',
    'dijit/layout/_LayoutWidget',
    'dojo/dom-geometry',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ListView.html',
    'dijit/_TemplatedMixin',
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dijit/layout/StackContainer',
    'xstyle/css!./css/ListView.css',
    "dijit/form/Select",
    'angrui/components/Select',
    "dijit/form/Form",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane"
],function (domClass, LoaderMixin, ScanDetail, window, domStyle, on, lang, ScanCreation, Dialog, Button, Container, Stores, ScanBox, LayoutContainer, LayoutWidget, domGeometry, WidgetBase, WidgetsInTemplateMixin, listviewTemplate, TemplatedMixin, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:listviewTemplate,

        store:null,

        layout:function(){
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainerNode.resize({w:size.w,h:size.h});
        },

        postCreate:function(){
            this.inherited(arguments);
        },

        startup:function(){
            this.inherited(arguments);
            this.refresh();
            var _t=this;
            on(this.allTab,'click',function () {
                domClass.toggle(_t.allTab,'selected',true);
                domClass.toggle(_t.prepareTab,'selected',false);
                domClass.toggle(_t.finishedTab,'selected',false);
                domClass.toggle(_t.processingTab,'selected',false); //TODO
                _t.status=null;
            });
            on(this.prepareTab,'click',function () {
                domClass.toggle(_t.allTab,'selected',false);
                domClass.toggle(_t.prepareTab,'selected',true);
                domClass.toggle(_t.finishedTab,'selected',false);
                domClass.toggle(_t.processingTab,'selected',false); //TODO
                _t.status='uploadingPhotos';
            });
            on(this.finishedTab,'click',function () {
                domClass.toggle(_t.allTab,'selected',false);
                domClass.toggle(_t.prepareTab,'selected',false);
                domClass.toggle(_t.finishedTab,'selected',true);
                domClass.toggle(_t.processingTab,'selected',false); //TODO
                _t.status='completed';
            });
            on(this.processingTab,'click',function () {
                domClass.toggle(_t.allTab,'selected',false);
                domClass.toggle(_t.prepareTab,'selected',false);
                domClass.toggle(_t.finishedTab,'selected',false);
                domClass.toggle(_t.processingTab,'selected',true); //TODO
                _t.status='processing';
            })
            Stores.scans.on('update,delete,add',function () {
                _t.refresh();
            })
        },

        refresh:function () {
            var _t=this;
            Stores.scans.getScans().then(function (scans) {
                scans.filter(function (scan) {
                    scan.status == _t.status;
                })
                
            })
            var _t=this;
            //listeners
            this.store = store;
            _t.container.getChildren().forEach(function(c){
                _t.container.removeChild(c)
            });
            var p = this.store.fetch().then(function (scans) {
                scans.forEach(function(scan){
                    _t.container.addChild(new ScanBox({
                        scanId:scan.id,
                        thumbnail:scan.thumbnail || (scan.photos[0] && scan.photos[0].image),
                        title:scan.title,
                        status:scan.status,
                        processStatus:scan.processStatus
                    }));
                })
            });
            this._requestLoader(p)
        },

        refresh:function(){//TODO performance
            this.setStore(this.store || Stores.scans);
        },


        newScan:function(){
            var size = window.getBox();
            var dialog = new Dialog({
                content:new ScanCreation({
                    createScan:function(){
                        var p = Stores.scans.add({
                            title:this.scanTitle.get('value'),
                            photos:[],
                            status:'uploadingPhotos'
                        }).then(function (scan) {
                            dialog.hide()
                            var size = window.getBox();
                            var dialog2 = new Dialog({
                                content:new ScanDetail({
                                    scanId:scan.id,
                                    style:"width:"+size.w*0.8+"px;",
                                    finished:function(){
                                        dialog2.hide();
                                    }
                                }),
                            });
                            dialog2.show()
                        })
                        this._requestLoader(p)
                        return p;
                    }
                })
            });
            dialog.show()
        },

    })
})