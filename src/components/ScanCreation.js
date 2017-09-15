define([
    'dojo/promise/all',
    'dojo/dom-style',
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
],function (all, domStyle, NumberTextBox, array, imageindicatorTemplate, when, LoaderMixin, FileUploader, Dialog, on, domClass, Memory, StoreContainer, List, Container, Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {

    var Image= declare([WidgetBase,TemplatedMixin],{
        templateString:imageindicatorTemplate,

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
                    var _t=this;
                    return new Image({
                        name:item.name,
                        remove:function(){
                            _t.store.removeSync(item.name);
                            _t.refresh();
                        }
                    });
                }
            },this.imgList);
            this.imgList.startup();
            _t.createBtn.startup();
            on(_t.uploadFile, "change", function() {
                _t.addFiles(_t.uploadFile.files);
                _t.uploadFile.value = null ;
            });
            on(this.uploadButton, "click", function(event) {
                _t.uploadFile.click();
            });
            on(_t.scanType,'change',function (val) {
                _t.unitNumber.set('readOnly',val == 1)
                if(val == 1){
                    _t.unitNumber.set('value',1)
                }
            });
            _t.createBtn.onClick = _t.createBtn.__onClick = function () {
                _t.upload();
            };
            on(_t.cancelBtn.domNode,'click',function () {
                _t.cancel();
            });
            this.refresh();
        },
        refresh:function () {
            var _t=this;
            var p = _t.imgList.refresh().then(function () {

                var nums =  _t.files && _t.files.fetchSync().length;
                return all({
                    price:Stores.users.getPrice(),
                    balance:Stores.balance.balance()
                }).then(function (data) {
                    var balance = data.balance.amount;
                    var unitNumber = _t.unitNumber.get('value');
                    var count = data.price.price * nums / unitNumber;
                    _t.costAmount.innerHTML = count;
                    _t.picAmount.innerHTML = nums;
                    _t.leftMoney.innerHTML= balance;
                    domStyle.set(_t.costMsg,'display','block');
                    domStyle.set(_t.errorMsg,'display', 'none');
                    _t.createBtn.set({'disabled':balance<=0});
                    if(balance < count){
                        domStyle.set(_t.errorMsg,'display', 'block');
                        _t.createBtn.set({'disabled':true});
                    }
                })
            });
            this._requestLoader(p);

        },
        upload:function(){
            if(this.creationForm.validate()){
                var files = this.files.sort('name',true).fetchSync();
                var formData = new FormData();
                var type =  this.scanType.get('value');
                formData.append("title", this.scanTitle.get('value'));
                formData.append("number", this.unitNumber.get('value'));
                array.forEach(files,function (f) {
                    formData.append("files", f);
                })
                var _t=this;
                var p = Stores.scans.addScan(formData,type).then(function (engineDto) {
                    _t.finished();
                }).otherwise(function (err) {
                    console.error(err);
                    alert('创建失败');
                });
                return this._requestLoader(p);
            }
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
        cancel:function(){
            this.finished();
        },
        finished:function () {

        }

    })
})