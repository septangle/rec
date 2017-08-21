define([
    '../Store/Stores',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ScanCreate.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css'
],function (Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {



    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scancreateTemplate,
        create:function(){
            Stores.add({
                title:this.title.get('value')
            }).then(function () {
                
            })
        }

    })
})