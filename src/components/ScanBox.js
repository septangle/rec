define([
    'dojo/on',
    'dijit/DialogUnderlay',
    'dojo/string',
    'dojo/window',
    'dijit/Dialog',
    'dojo/when',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-style',
    '../Store/Stores',
    'dojo/text!./templates/ScanBox.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'xstyle/css!./css/ScanBox.css'
],function (on, DialogUnderlay, string, window, Dialog, when, WidgetsInTemplateMixin, domStyle, Stores, scanboxTemplate, TemplatedMixin, LayoutWidget, declare) {

    Dialog = declare([Dialog], {
        closeOnBlur:true,
        closeByEsc:true,
        cloasable:false,

        show:function(){
            var _t =this;
            this.inherited(arguments)
            _t.closeOnBlur && _t.own(
                on( DialogUnderlay._singleton.domNode, 'click', _t.hide.bind(_t) )
            );
            _t.closeByEsc && _t.own(
                on(document.body, 'keydown', function(evt){
                    if(evt.keyCode == keys.ESCAPE){
                        _t.hide();
                    }
                })
            );
            this.resize();
        },

        hide:function(){
            this.inherited(arguments);
            this.destroy();
        },

    })


    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scanboxTemplate,
        baseClass:'ScanBox',
        declareClass:'ScanBox',
        preView:function() {
            var size = window.getBox();
            new Dialog({
                className:"ScanBox-Dialog",
                content:string.substitute("<iframe src='http://www.baidu.com' ></iframe>",{w:size.w*0.9,h:size.h*0.9}),
            }).show()
        },

        edit:function () {

        },

        remove:function(){
            Stores.scans.remove(this.id);
        }

    })
})