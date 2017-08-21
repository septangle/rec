define([
    'dojo/on',
    'dojo/_base/lang',
    '../components/ScanDetail',
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
],function (on, lang, ScanDetail, Dialog, Button, Container, Stores, ScanBox, LayoutContainer, LayoutWidget, domGeometry, WidgetBase, WidgetsInTemplateMixin, listviewTemplate, TemplatedMixin, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
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
            on(this.prepareTab,'click',function () {
                _t.setStore(Stores.scans.filter({status:'prepare'}));
            });
            on(this.finishedTab,'click',function () {
                _t.setStore(Stores.scans.filter({status:'finished'}));
            });
            on(this.processingTab,'click',function () {
                _t.setStore(Stores.scans.filter({status:'processing'}));
            })
        },

        setStore:function (store) {
            var _t=this;
            //listeners
            this.store = store;
            _t.container.getChildren().forEach(function(c){
                _t.container.removeChild(c)
            });
            this.store.fetch().then(function (scans) {
                scans.forEach(function(scan){
                    _t.container.addChild(new ScanBox({
                        scanId:scan.id,
                        thumbnail:scan.thumbnail,
                        title:scan.title,
                        status:scan.status,
                        processStatus:scan.processStatus
                    }));
                })
            });
        },

        refresh:function(){//TODO performance
            this.setStore(this.store || Stores.scans.filter({status:'finished'}));
        },


        newScan:function(){
            new Dialog({
                content:new ScanDetail()
            }).show()
        },

    })
})