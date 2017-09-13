define([
    'dijit/layout/StackContainer',
    'dijit/registry',
    'dojo/query',
    'dojo/dom-class',
    '../components/LoaderMixin',
    '../components/ScanDetail',
    'dojo/window',
    'dojo/dom-style',
    'dojo/on',
    'dojo/_base/lang',
    '../components/ScanCreation',
    '../components/Dialog',
    'dijit/form/Button',
    'dijit/_Container',
    '../Store/Stores',
    '../components/ScanBox',
    'dijit/layout/LayoutContainer',
    'dijit/layout/_LayoutWidget',
    'dojo/dom-geometry',
    'dijit/_WidgetBase',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/AdminView.html',
    'dijit/_TemplatedMixin',
    'dojo/_base/declare',
    'dijit/layout/ContentPane',
    'dijit/layout/StackContainer',
    'xstyle/css!./css/AdminView.css',
    "dijit/form/Select",
    'angrui/components/Select',
    "dijit/form/Form",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "angrui/components/Select"
],function (StackContainer, registry, query, domClass, LoaderMixin, ScanDetail, window, domStyle, on, lang, ScanCreation, Dialog, Button, Container, Stores, ScanBox, LayoutContainer, LayoutWidget, domGeometry, WidgetBase, WidgetsInTemplateMixin, adminviewTemplate, TemplatedMixin, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:adminviewTemplate,

        postCreate:function(){
            this.inherited(arguments);
        },

        layout:function(){
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainer.resize({w:size.w,h:size.h});
        },

        selectView:function(title){
            var view = this.stackContainer.getChildren().filter(function (view) {
                return view.title == title
            })[0];
            this.stackContainer.selectChild(view);
        },
        select2Dmanagement:function () {
            this.selectView('2dManagement')
        },
        selectRecharge:function () {
            this.selectView('reCharge')
        }


    })
})