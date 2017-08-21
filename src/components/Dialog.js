define([
    'dojo/keys',
    'dojo/dom-class',
    'dojo/on',
    'dijit/DialogUnderlay',
    'dijit/Dialog',
    'dojo/_base/declare',
    'xstyle/css!./css/Dialog.css'
],function (keys, domClass, on, DialogUnderlay, Dialog, declare) {
    return declare([Dialog], {
        closeOnBlur:true,
        closeByEsc:true,
        cloasable:false,
        postCreate:function(){
            this.inherited(arguments);
            domClass.add(this.domNode,'Dialog');
        },
        show:function(){
            var _t =this;
            this.inherited(arguments)
            _t.closeOnBlur && _t.own(
                on( DialogUnderlay._singleton.domNode, 'click', function(){
                    //TODO
                    if(Dialog._DialogLevelManager.isTop(_t)){
                        _t.hide()
                    }
                })
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
})
