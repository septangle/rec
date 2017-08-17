define([
    'dijit/_WidgetBase',
    'dojo/dom-style',
    'dijit/form/NumberTextBox',
    'dojo/_base/lang',
    'dijit/form/ValidationTextBox',
    'dojo/on',
    '../Store/Stores',
    'dojo/dom-class',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/RegisterView.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dijit/layout/StackContainer',
    'xstyle/css!./css/RegisterView.css',
    "dijit/form/Select",
    'angrui/components/Select',
    "dijit/form/Form"
],function (WidgetBase, domStyle, NumberTextBox, lang, ValidationTextBox, on, Stores, domClass, WidgetsInTemplateMixin, registerviewTemplate, TemplatedMixin, LayoutWidget, declare) {
    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:registerviewTemplate,
        basicStatusPng:  require.toUrl('angrui/css/images/status-basic.png'),
        additionalStatusPng:  require.toUrl('angrui/css/images/status-addtional.png'),
        finishStatusPng:  require.toUrl('angrui/css/images/status-finish.png'),
        finishIcon: require.toUrl('angrui/css/images/finished.png'),
        selectPane:function (pane) {
            this.selected && domClass.remove(this.selected,'selected');
            this.selected = pane;
            domClass.add(this.selected,'selected');
        },
        saveBasic:function () {
            if(this.basicInfoForm.validate()){
                this.selectPane(this.additionalPane);
            }
        },
        register:function () {
            var _t=this;
            if(this.additionalForm.validate()){
                Stores.users.register(this.getValues()).then(function () {
                    _t.selectPane(_t.finishPane);
                }).otherwise(function () {
                    domStyle.set(_t.validMsg,'visibility','visible')
                })
            }
        },
        getValues:function () {
            var values = {};
            values = lang.mixin(values,this.basicInfoForm.getValues());
            values = lang.mixin(values,this.additionalForm.getValues());
            return values
        },
        login:function () {
            
        },
        postCreate:function(){
            this.inherited(arguments);
            this.province.set('store',Stores.province);
            var _t=this;
            on(this.province,'change',function (val) {
                _t.city.set('store',Stores.getCities(val))
            })
            this.repeatPassword.set({
                invalidMessage: "密码必须相同",
                validator: function(value) {
                    return _t.password.getValue() === value;
                }
            });
        },
        startup:function () {
            this.inherited(arguments);
            this.selectPane(this.basicPane);
        }

    })
})