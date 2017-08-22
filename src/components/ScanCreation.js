define([
    '../components/LoaderMixin',
    './Dialog',
    '../Store/Stores',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ScanCreate.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css'
],function (LoaderMixin,Dialog, Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {



    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:scancreateTemplate,
        createScan:function(){}

    })
})