define([
    'dijit/_WidgetsInTemplateMixin',
    'dijit/layout/BorderContainer',
    'dijit/layout/StackContainer',
    'dijit/layout/ContentPane',
    'dojo/window',
    'dijit/_Container',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dijit/layout/_LayoutWidget',
    'dojo/text!./templates/App.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'xstyle/css!font-awesome/css/font-awesome.css',
    'xstyle/css!./css/App.css',
    'xstyle/css!dijit/themes/dijit.css',
    'xstyle/css!./theme/Tooltips.css'
],function (WidgetsInTemplateMixin, BorderContainer, StackContainer, ContentPane, window, Container, domStyle, domGeometry, LayoutWidget, appTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:appTemplate,
        postCreate:function () {
          this.inherited(arguments);
        },
        addView:function (view) {
            this.stackNode.addChild(view);
        },
        layout:function(){
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainerNode.resize({w:size.w,h:size.h});
        }
    })
})