define([
    'dojo/when',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-style',
    '../Store/Stores',
    'dojo/text!./templates/ScanBox.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'xstyle/css!./css/ScanBox.css'
],function (when, WidgetsInTemplateMixin, domStyle, Stores, scanboxTemplate, TemplatedMixin, LayoutWidget, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:scanboxTemplate,
    })
})