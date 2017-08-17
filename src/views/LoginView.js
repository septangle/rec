define([
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/LoginView.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'xstyle/css!./css/LoginView.css',
    'angrui/components/LoginForm'
],function (WidgetsInTemplateMixin, loginviewTemplate, TemplatedMixin, LayoutWidget, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:loginviewTemplate
    })
})