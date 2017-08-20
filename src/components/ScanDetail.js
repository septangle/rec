define([
    'dojo/text!./templates/ScanDetail.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare"
],function (scandetailTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([WidgetBase,TemplatedMixin],{
        templateString:scandetailTemplate,
    })
})