define([
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
],function (ScanDetail,on, DialogUnderlay, string, window, Dialog, when, WidgetsInTemplateMixin, domStyle, Stores, scanboxTemplate, TemplatedMixin, LayoutWidget, declare) {


    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scanboxTemplate,
        baseClass:'ScanBox',
        declareClass:'ScanBox',
        preView:function() {
            var size = window.getBox();
            new Dialog({
                content:string.substitute("<iframe src='http://www.baidu.com' ></iframe>",{w:size.w*0.9,h:size.h*0.9}),
            }).show()
        },

        edit:function () {
            new Dialog({
                content:new ScanDetail(),
            }).show()
        },

        remove:function(){
            Stores.scans.remove(this.id);
        }

    })
})