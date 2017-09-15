define([
    'dojo/_base/array',
    'dstore/Memory',
    '../components/StoreContainer',
    'dojo/text!../components/templates/ImageIndicator.html',
    'dojo/store/Memory',
    '../Store/Stores',
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
    "angrui/components/Select",
    'dijit/form/FilteringSelect'
], function (array, dstoreMemory, StoreContainer, imageindicatorTemplate, Memory, Stores, StackContainer, registry, query, domClass, LoaderMixin, ScanDetail, window, domStyle, on, lang, ScanCreation, Dialog, Button, Container, Stores, ScanBox, LayoutContainer, LayoutWidget, domGeometry, WidgetBase, WidgetsInTemplateMixin, adminviewTemplate, TemplatedMixin, declare) {

    var Image= declare([WidgetBase,TemplatedMixin],{
        templateString:imageindicatorTemplate,

    })


    return declare([LayoutWidget, TemplatedMixin, WidgetsInTemplateMixin, LoaderMixin], {
        templateString: adminviewTemplate,

        postCreate: function () {
            this.inherited(arguments);
        },

        startup: function () {
            this.inherited(arguments);
            var _t = this;
            Stores.users.getAll().then(function (users) {
                var store = new Memory({
                    data: users
                })
                _t.rechargemMmeberId.set({'store': store})
            })
            on(this.rechargemMmeberId, 'change', function (val) {
                if (val) {
                    var p = Stores.balance.balance().then(function (balance) {
                        _t.balance.set('value',balance.amount);
                    });
                    _t._requestLoader(p);
                }
            });
            this.files = new dstoreMemory({data: [], idProperty: 'name'});
            this.imgList = new StoreContainer({
                insertChildIndex: -1,
                store: this.files.sort('name', true), // a dstore collection
                renderItem: function (item) {
                    var _t = this;
                    return new Image({
                        name: item.name,
                        remove: function () {
                            _t.store.removeSync(item.name);
                            _t.refresh();
                        }
                    });
                }
            }, this.imgList);
            this.imgList.startup();
            on(_t.uploadFile, "change", function() {
                _t.addFiles(_t.uploadFile.files);
                _t.uploadFile.value = null ;
            });
            on(this.uploadButton, "click", function(event) {
                _t.uploadFile.click();
            });
        },

        layout: function () {
            var size = domGeometry.getContentBox(this.domNode);
            this.borderContainer.resize({w: size.w, h: size.h});
        },

        selectView: function (title) {
            var view = this.stackContainer.getChildren().filter(function (view) {
                return view.title == title
            })[0];
            this.stackContainer.selectChild(view);
        },
        select2Dmanagement: function () {
            this.selectView('2dManagement')
        },
        selectRecharge: function () {
            this.selectView('reCharge')
        },

        executeCharge: function () {
            if (this.rechargeForm.validate()) {
                var p = Stores.balance.recharge(this.rechargeForm.getValues()).otherwise(function () {
                    alert('充值失败');
                })
                this._requestLoader(p);
            }

        },
        cancelCharge: function () {
            this.rechargeForm.reset();
        },

        addFiles: function (files) {
            var _t = this;
            array.forEach(files, function (item) {
                _t.files.putSync(item);
            })
            _t.imgList.refresh();
        },
    })
})