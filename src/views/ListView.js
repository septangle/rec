define([
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
    "dijit/form/Form"
],function (WidgetBase, WidgetsInTemplateMixin, listviewTemplate, TemplatedMixin, declare) {
    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:listviewTemplate,


    })
})