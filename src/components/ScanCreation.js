define([
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
],function (domStyle, NumberTextBox, array, imageindicatorTemplate, when, LoaderMixin, FileUploader, Dialog, on, domClass, Memory, StoreContainer, List, Container, Stores, WidgetsInTemplateMixin, scancreateTemplate, TemplatedMixin, WidgetBase, declare) {

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
            });
            on(this.uploadButton, "click", function(event) {
                _t.uploadFile.click();
            });
            on(_t.scanType,'change',function (val) {
                domClass.toggle(_t.pointNum,'hidden',val == '3D');
            });
            _t.createBtn.onClick = _t.createBtn.__onClick = function () {
                _t.upload();
            };
            on(_t.startBtn.domNode,'click',function () {
                _t.startProcess();
            });
            this.refresh();
        },
        refresh:function () {
            var _t=this;
            var p = _t.imgList.refresh().then(function () {
                _t.createBtn.set({'disabled':_t.benacoScanId});
                _t.startBtn.set({'disabled':!_t.benacoScanId});

                var nums =  _t.files && _t.files.fetchSync().length;
                return Stores.users.getPrice().then(function (data) {
                    var balance = 100000;
                    var count = data.price * nums;
                    _t.costAmount.innerHTML = count;
                    _t.picAmount.innerHTML = nums;
                    _t.leftMoney.innerHTML= balance;
                    domStyle.set(_t.costMsg,'display',(nums>0 && count <= balance ) ? 'block' :'none');
                    domStyle.set(_t.errorMsg,'display',balance < count ? 'block' :'none');
                    if(balance < count){
                        _t.createBtn.set({'disabled':true});
                        _t.startBtn.set({'disabled':true});
                    }
                })
            });
            this._requestLoader(p);

        },
        upload:function(){
            var files = this.files.sort('name',true).fetchSync();
            var formData = new FormData();
            var type =  this.scanType.get('value');
            formData.append("title", this.scanTitle.get('value'));
            type === '2D' && formData.append("unitNum", this.unitNumber.get('value'));
            array.forEach(files,function (f) {
                formData.append("files", f);
            })
            var _t=this;
            var p = Stores.scans.addScan(formData,type).then(function (engineDto) {
                _t.benacoScanId = engineDto.benacoScanId;
                _t.refresh();
            });
            return this._requestLoader(p);
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
            var p = Stores.scans.startProcess(this.benacoScanId).then(function () {
                _t.finished();
            });
            this._requestLoader(p)
        },
        finished:function () {

        }

    })
})