define([
    'dojo/dom-construct',
    'dijit/_WidgetBase',
    'dijit/_Container',
    './ScanDetail',
    'dojo/on',
    'dijit/DialogUnderlay',
    'dojo/string',
    'dojo/window',
    './Dialog',
    'dojo/when',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-style',
    '../Store/Stores',
    'dojo/text!./templates/ScanBox.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'xstyle/css!./css/ScanBox.css'
],function (domConstruct, WidgetBase, Container, ScanDetail, on, DialogUnderlay, string, window, Dialog, when, WidgetsInTemplateMixin, domStyle, Stores, scanboxTemplate, TemplatedMixin, LayoutWidget, declare) {


    return declare([WidgetBase, Container],{
        store:null,
        insertChildIndex:null,

        renderItem:function(item){
            //need override
            return domConstruct.toDom('<div>'+JSON.stringify(item)+'</div>')
        },


        refresh:function () {
            var _t=this;
            _t.getChildren().forEach(function(c){
                _t.container.removeChild(c)
            });
            return when(this.store && this.store.fetch().then(function (items) {
                items.forEach(function (item) {
                    _t.addChild(_t.renderItem(item),_t.insertChildIndex);
                })
            }));
        },

        setStore:function(store){
            this.store = store;
            this.refresh();
        },

        startup:function(){
            this.inherited(arguments);
            this.refresh();
        }
    })
})