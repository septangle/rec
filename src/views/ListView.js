define([
    'dijit/registry',
    'dojo/query',
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
],function (registry, query, domClass, LoaderMixin, ScanDetail, window, domStyle, on, lang, ScanCreation, Dialog, Button, Container, Stores, ScanBox, LayoutContainer, LayoutWidget, domGeometry, WidgetBase, WidgetsInTemplateMixin, listviewTemplate, TemplatedMixin, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:listviewTemplate,

        status:'all',

        layout:function(){
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainerNode.resize({w:size.w,h:size.h});
        },

        postCreate:function(){
            this.inherited(arguments);
        },

        startup:function(){
            this.inherited(arguments);
            var _t=this;

            query('.tab-list .tab').forEach(function (tab) {
                tab = registry.byNode(tab);
                on(tab,'click',function () {
                    query('.tab-list .tab').forEach(function (tab) {
                        domClass.remove(tab,'selected');
                    })
                    domClass.add(tab.domNode,'selected');
                    _t.status = tab.status;
                    _t.refresh();
                });
            })
            this.refresh();

        },

        refresh:function () {
            var _t=this;


            var p = Stores.scans.getScans().then(function (scans) {
                var statusMap={
                    'all' : ['0','1','2','3'],
                    'completed' : ['2','3'],
                    'processing' : ['0','1']
                }
                scans = scans.filter(function (scan) {
                    return statusMap[_t.status].indexOf(scan.status) >=0;
                })
                //listeners
                _t.container.getChildren().forEach(function(c){
                    _t.container.removeChild(c)
                });
                scans.forEach(function(scan){
                    _t.container.addChild(new ScanBox({
                        scanId:scan.id,
                        benacoScanId:scan.benacoScanId,
                        thumbnail:scan.thumbImagePath,
                        title:scan.description,
                        status:scan.status,
                    }));
                })
            });

            this._requestLoader(p)
        },




        newScan:function(){
            var size = window.getBox();
            var _t=this;
            var dialog = new Dialog({
                closeOnBlur:false,
                content:new ScanCreation({
                    finished:function(){
                        dialog.hide();
                        _t.refresh();
                    },
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