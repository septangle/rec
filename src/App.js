define([
    './Store/Stores',
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
    'xstyle/css!./theme/main.css'
],function (Stores,WidgetsInTemplateMixin, BorderContainer, StackContainer, ContentPane, window, Container, domStyle, domGeometry, LayoutWidget, appTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:appTemplate,
        addView:function (view) {
            this.stackNode.addChild(view);
        },
        selectView:function(title){
            var view = this.stackNode.getChildren().filter(function (view) {
                return view.title == title
            })[0];
            this.stackNode.selectChild(view);
        },
        layout:function(){
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainerNode.resize({w:size.w,h:size.h});
        },
        logout:function(){
            Stores.users.logout().then(function(){
                location.reload();
            });
        }
    })
})