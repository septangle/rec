define(["dojo/dom-construct",
    "dojo/topic",
    "dojo/_base/array",
    "dojo/dom-class",
    "dojo/_base/declare",
    "xstyle/css!./css/LoaderMixin.css",
], function(domConstruct, topic, array, domClass, declare) {

    // have loaderNode and just one
    return declare([], {
        _loaders: [],

        postCreate: function() {
            this.inherited(arguments);
            domClass.add(this.domNode, "loaderMixin");
        },

        _loader: function(domNode, flag, force) {
            var item = this._getLoaderData(domNode);
            flag?item.count++:item.count--;
            if(force) {
                item.count=0;
            }
            domClass.toggle(domNode, "show", item.count>0);
        },

        /*
        *
        *options:
        *   loaderNode
        *   successMsg
        *   errorMsg
        * */

        _requestLoader: function(promise, options) {
            options = options ||{};
            var _t=this, loaderNode = options.loaderNode ||this.loaderNode;
            this._loader(loaderNode, true);
            this.own && this.own(promise);
            return promise.then(function(result) {
                //TODO
                return result;
            }, function(error) {
                console.log(error);
            }).always(function() {
                _t._loader(loaderNode, false);
            });

        },

        _getLoaderData: function(domNode) {
            var item = array.filter(this._loaders, function(item) {
                return domNode == item.domNode;
            })[0];
            if(!item) {
                item = {
                    domNode: domNode,
                    count: 0,
                };
                this._loaders.push(item);
            }
            return item;
        },

        _createDefaultLoader: function() {
            this.loaderNode = domConstruct.toDom("<div data-dojo-attach-point=\"loaderNode\" class=\"loaderOverlay\"><i class=\"loader fa fa-spinner fa-spin  fa-3x\" ></i></div>");
            domConstruct.place(this.loaderNode, this.domNode);
        },
    });
});
