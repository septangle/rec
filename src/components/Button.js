define([
    'dojo/text!./templates/Button.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare"
],function (buttonTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([WidgetBase,TemplatedMixin],{
        templateString:buttonTemplate,
        onClick:function () {
            
        }
    })
})