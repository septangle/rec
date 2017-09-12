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
        preViewAble:false,
        preView:function() {
            var size = window.getBox();
            new Dialog({
                content:string.substitute("<iframe src='https://beta.benaco.com/embed/${scanId}' width='${w}px' height='${h}px' ></iframe>",{w:size.w*0.9,h:size.h*0.9,scanId:this.scanId}),
            }).show()
        },

        _setThumbnailAttr:function (thumbnail) {
            this.imageNode.src = thumbnail || require.toUrl('angrui/css/images/hotel.jpg');
        },

        edit:function () {
            // var size = window.getBox();
            // var dialog = new Dialog({
            //     content:new ScanDetail({
            //         scanId:this.scanId,
            //         style:"width:"+size.w*0.8+"px;",
            //         finished:function(){
            //             dialog.hide();
            //         }
            //     }),
            // });
            // dialog.show()
        },

        remove:function(){
            Stores.scans.removeScan(this.scanId);
        },
        
        paint:function () {
            
        },

        startup:function(){
            this.inherited(arguments);
            var _t=this;
            this.preViewAble = _t.status.status === 'completed';
            if(_t.status.status === 'failed'){
                domStyle.set(this.errorIcon,{
                    display:'block'
                })
            }
            if(this.preViewAble ){ //TODO use css
                domStyle.set(_t.editAction,{
                    display:'none'
                });
            }else{
                domStyle.set(_t.paintAction,{
                    display:'none'
                });
                domStyle.set(_t.previewAction,{
                    display:'none'
                });
            }
            on(_t.imageNode,'dblclick',function(){
                if(_t.preViewAble) {
                    _t.preView();
                }else{
                    _t.edit();
                }
            })
        }


    })
})