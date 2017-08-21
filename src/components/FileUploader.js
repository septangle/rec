define([
    "dojo/promise/all",
    "dojo/when",
    "dijit/_Container",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/on",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetBase",
    "dojo/text!./templates/FileUploader.html",
    "dojo/text!./templates/UploadFileItem.html",
    "dojo/_base/declare",
    "dijit/form/Button",
    "xstyle/css!./css/FileUploader.css",
    "dijit/ProgressBar",
], function(all, when, Container, array, domClass, on, WidgetsInTemplateMixin, TemplatedMixin, WidgetBase, template, UploadFileItemTemplate, declare) {

    var UploadFileItem= declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: UploadFileItemTemplate,
        parent: null,
        file: null,
        setProcess: function(val) {
            this.progressBar.set("value", val);
        },
        remove: function() {

        },
    });


    return declare([WidgetBase, TemplatedMixin, WidgetsInTemplateMixin, Container], {
        baseClass: "FileUploader",
        declaredClass: "FileUploader",
        templateString: template,
        multi: true,
        value: null,
        _setMultiAttr: function(val) {
            this.uploadFile.multiple = this.multi = val;
        },
        postCreate: function() {
            this.value=[];
            this.inherited(arguments);
            var _t = this;
            _t.setUpDragDrop();
            on(_t.uploadFile, "change", function() {
                _t.addFiles(_t.uploadFile.files);
            });
            on(this.uploadButton, "click", function(event) {
                _t.uploadFile.click();
            });
        },
        startup: function() {
            this.inherited(arguments);
            this.updateFileList();
        },
        _getUploadFileItem: function(f) {
            return this.getChildren().filter(function(item) {
                return item.file == f;
            })[0];
        },
        _upload: function() {
            var _t = this;
            all(array.map(this.value, function(f) {
                return _t.upload(f).then(function(res) {
                    _t._getUploadFileItem(f).setProcess(100);
                }, function(err) {
                    domClass.add(_t._getUploadFileItem(f).progressBar.domNode, "danger");
                }, function(e) {
                    _t._getUploadFileItem(f).setProcess(e.loaded/ f.size * 100);//TODO
                });
            })).then(function() {
                _t.finished();
            });
        },
        finished: function() {

        },
        upload: function(f) {
            return when(true);//override it.
        },
        updateFileList: function() {
            var _t = this;
            domClass.toggle(this.placeHolderNode, "hide", this.value && this.value.length);
            this.destroyDescendants();
            array.forEach(this.value, function(f) {
                console.log(f);
                _t.addChild(new UploadFileItem({
                    filename: f.name,
                    file: f,
                    remove: function() {
                        var i = array.indexOf(_t.value, f);
                        if(i>= 0) {
                            _t.value.splice(i, 1);
                        }
                        _t.updateFileList();
                    },
                }));
            });
        },
        _cancel: function() {
            //TODO cancel processing request.
            this.value=[];
            this.updateFileList();
            this.cancel();
        },
        cancel: function() {

        },
        addFiles: function(files) {
            var _t = this;
            if(this.multi) {
                array.forEach(files, function(f) {
                    _t.value.push(f);
                });
            }else{
                _t.value = [files[0]];
            }
            this.updateFileList();
        },
        setUpDragDrop: function() {
            //TOOD
            var _t = this;
            on(this.uploadNode, "drop", function(e) {
                var files = e.target.files || e.dataTransfer.files;
                domClass.remove(this, "dragOver");
                e.preventDefault();
                _t.addFiles(files);
            });

            on(this.uploadNode, "dragover", function(e) {
                domClass.add(this, "dragOver");
                e.preventDefault();
                return false;
            });
            on(this.uploadNode, "dragleave", function(e) {
                domClass.remove(this, "dragOver");
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
            on(this.uploadNode, "dragend", function(e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            });
        },
    });
});
