define([
    'dojo/when',
    'dijit/_WidgetsInTemplateMixin',
    'dojo/dom-style',
    '../Store/Stores',
    'dojo/text!./templates/LoginForm.html',
    'dijit/_TemplatedMixin',
    'dijit/layout/_LayoutWidget',
    'dojo/_base/declare',
    'xstyle/css!./css/LoginForm.css'
],function (when, WidgetsInTemplateMixin, domStyle, Stores, loginformTemplate, TemplatedMixin, LayoutWidget, declare) {
    return declare([LayoutWidget,TemplatedMixin,WidgetsInTemplateMixin],{
        templateString:loginformTemplate,
        qqIcon: require.toUrl('angrui/components/css/images/QQ@3x.png'),
        wechatIcon: require.toUrl('angrui/components/css/images/wechat@3x.png'),
        weiboIcon: require.toUrl('angrui/components/css/images/weibo@3x.png'),
        login:function(){
            var _t=this;
            when(this.username.value && this.password.value).then(function(valid){
                if(!valid){
                    throw 'invalid';
                }
                return valid && Stores.users.auth({
                    tel:_t.username.value,
                    password:_t.password.value
                })
            }).then(function () {
                window.location ='./index.html'
            }).otherwise(function (err) {
                domStyle.set(_t.validMsg,'visibility','visible')
            })
        }
    })
})