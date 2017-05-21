!function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var n=window.webpackJsonp;window.webpackJsonp=function(t,c,a){for(var u,i,f,s=0,d=[];s<t.length;s++)i=t[s],o[i]&&d.push(o[i][0]),o[i]=0;for(u in c)Object.prototype.hasOwnProperty.call(c,u)&&(e[u]=c[u]);for(n&&n(t,c,a);d.length;)d.shift()();if(a)for(s=0;s<a.length;s++)f=r(r.s=a[s]);return f};var t={},o={12:0};r.e=function(e){function n(){c.onerror=c.onload=null,clearTimeout(a);var r=o[e];0!==r&&(r&&r[1](new Error("Loading chunk "+e+" failed.")),o[e]=void 0)}if(0===o[e])return Promise.resolve();if(o[e])return o[e][2];var t=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.charset="utf-8",c.async=!0,c.timeout=12e4,r.nc&&c.setAttribute("nonce",r.nc),c.src=r.p+"/js/"+({2:"app",3:"vendor",9:"ureact-code-editor"}[e]||e)+"."+{0:"73bbb",1:"1805a",2:"6d791",3:"459ac",4:"c0357",5:"7c7da",6:"0194d",7:"8bb38",8:"20cfd",9:"5cd8f",10:"84e44",11:"da83e"}[e]+".js";var a=setTimeout(n,12e4);c.onerror=c.onload=n;var u=new Promise(function(r,n){o[e]=[r,n]});return o[e][2]=u,t.appendChild(c),u},r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r.oe=function(e){throw console.error(e),e}}([]);

var OriginalXHR = XMLHttpRequest;
var XInterceptor = (function () {
    function XInterceptor() {
        this.x = new OriginalXHR();
        this.clone();
        this.handleUpdates();
    }
    XInterceptor.prototype.handleUpdates = function () {
        var _this = this;
        var actual = this.x;
        actual.addEventListener('readystatechange', function () {
            _this.responseText = XInterceptor.processors.reduce(function (p, c) {
                return c(p);
            }, actual.responseText || actual.response);
            _this.response = _this.responseText;
            _this.dispatchEvent(new Event('onreadystatechange'));
            if (_this.onreadystatechange) {
                return _this.onreadystatechange();
            }
        });
    };
    XInterceptor.prototype.clone = function () {
        this.addProxyGetter();
        this.addProxyGetterSetters();
        this.addProxyPassThroughMethods();
    };
    XInterceptor.prototype.addProxyGetter = function () {
        var _this = this;
        var actual = this.x;
        ["status", "statusText", "responseType",
            "readyState", "responseXML", "upload"].forEach(function (item) {
            Object.defineProperty(_this, item, {
                get: function () { return actual[item]; }
            });
        });
    };
    XInterceptor.prototype.addProxyGetterSetters = function () {
        var _this = this;
        var actual = this.x;
        ["ontimeout, timeout", "withCredentials", "onload", "onerror", "onprogress"].forEach(function (item) {
            Object.defineProperty(_this, item, {
                get: function () { return actual[item]; },
                set: function (val) { actual[item] = val; }
            });
        });
    };
    XInterceptor.prototype.addProxyPassThroughMethods = function () {
        var _this = this;
        var actual = this.x;
        ["addEventListener", "send", "open", "abort", "getAllResponseHeaders",
            "getResponseHeader", "overrideMimeType", "setRequestHeader", "dispatchEvent"].forEach(function (item) {
            Object.defineProperty(_this, item, {
                value: function () { return actual[item].apply(actual, arguments); }
            });
        });
    };
    XInterceptor.addProcessor = function (f) {
        this.processors.push(f);
    };
    return XInterceptor;
}());
XInterceptor.processors = [];
window['XMLHttpRequest'] = XInterceptor;
XInterceptor.addProcessor(function (s) {
    if (s) {
        try {
            var o = JSON.parse(s);
            o.data = o.data || {};
            if (o.data.user) {
                o.data.user.can_see_professional_profile = true;
                if (!o.data.user.nanodegrees) {
                    o.data.user.nanodegrees = [];
                }
                o.data.user.nanodegrees.push({ id: 278822, key: "nd101", locale: "en-us", version: "1.0.0" });
            }
            return JSON.stringify(o);
        }
        catch (e) {
            return s;
        }
    }
    return s;
});
