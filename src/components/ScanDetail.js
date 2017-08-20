define([
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ScanDetail.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css'
],function ( WidgetsInTemplateMixin, scandetailTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scandetailTemplate,
    })
})