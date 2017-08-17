define([
    'dijit/form/ComboBox',
    'dijit/form/Select',
    'dojo/text!./templates/Select.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'xstyle/css!./css/Select.css'
],function (ComboBox, Select, selectTemplate, TemplatedMixin, WidgetBase, declare) {
    return declare([ComboBox],{
        templateString:selectTemplate,

    })
})