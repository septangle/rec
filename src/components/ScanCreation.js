define([
    'dijit/form/NumberTextBox',
    'dojo/_base/array',
    'dojo/text!./templates/ImageIndicator.html',
    'dojo/when',
    '../components/LoaderMixin',
    '../components/FileUploader',
    '../components/Dialog',
    'dojo/on',
    'dojo/dom-class',
    'dstore/Memory',
    '../components/StoreContainer',
    'dgrid/List',
    'dijit/_Container',
    '../Store/Stores',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/text!./templates/ScanCreate.html',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetBase',
    "dojo/_base/declare",
    'dijit/form/ValidationTextBox',
    'xstyle/css!./css/ScanDetail.css',
    "angrui/components/Select"
],function (NumberTextBox, array, imageindicatorTemplate, when, LoaderMixin, FileUploader, Dialog, on, domClass, Memory, StoreContainer, List, Container, Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {

    var Image= declare([WidgetBase,TemplatedMixin],{
        templateString:imageindicatorTemplate
    })


    return declare([WidgetBase,TemplatedMixin,WidgetsInTemplateMixin,LoaderMixin],{
        templateString:scancreateTemplate,
        plusIcon:require.toUrl('angrui/css/images/plus.png'),
        _setMultiAttr: function(val) {
            this.uploadFile.multiple = this.multi = val;
        },
        postCreate:function () {
            this.inherited(arguments)

        },
        startup:function(){
            this.inherited(arguments);
            var _t=this;
            this.files= new Memory({data:[],idProperty:'name'});
            this.imgList = new StoreContainer({
                insertChildIndex:-1,
                store: this.files.sort('name',true), // a dstore collection
                renderItem: function (item) {
                    return new Image({
                        name:item.name
                    });
                }
            },this.imgList);
            this.imgList.startup();

            on(_t.uploadFile, "change", function() {
                _t.addFiles(_t.uploadFile.files);
            });
            on(this.uploadButton, "click", function(event) {
                _t.uploadFile.click();
            });
            on(_t.scanType,'change',function (val) {
                domClass.toggle(_t.pointNum,'hidden',val == '3D');
            })
        },
        refresh:function () {
            var _t=this;
            var p = _t.imgList.refresh();
            this._requestLoader(p)

        },
        upload:function(){
            var files = this.files.sort('name',true).fetchSync();
            var formData = new FormData();
            var type =  this.scanType.get('value');
            formData.append("title", this.scanTitle.get('value'));
            type === '2D' && formData.append("unitNum", this.unitNumber.get('value'));
            formData.append("file", files);
            return Stores.scans.upload(formData,type);
        },
        addFiles:function(files){
            var _t=this;
            array.forEach(files,function (item) {
                _t.files.putSync(item);
            })
            _t.refresh();
        },
        selectFiles:function(){

        },
        startProcess:function(){
            //TODO disable when have no scanId
            var _t=this;
            var p = Stores.scans.startProcess(this.scanId).then(function () {
                _t.finished();
            });
            this._requestLoader(p)
        },
        finished:function () {

        }

    })
})