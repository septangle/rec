define([
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
],function (window, Container, domStyle, domGeometry, LayoutWidget, appTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([LayoutWidget,TemplatedMixin,Container],{
        templateString:appTemplate,
        postCreate:function () {
          this.inherited(arguments);
        },
        layout:function(){
            var totalHeight = window.getBox().h;
            var headerHeight = domGeometry.getMarginBox(this.headerNode).h;
            var minMainHeight = totalHeight -headerHeight ;
            domStyle.set(this.mainNode,{
                minHeight: minMainHeight+'px'
            });
            //here we just have one child
            var singleChild = this.getChildren()[0]
            singleChild.resize && singleChild.resize({h:minMainHeight});
        }
    })
})