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
    if (s && window.location.href.indexOf('classroom.udacity.com/nanodegrees/nd101/') > 0) {
        try {
            var o = JSON.parse(s);
            o.data = o.data || {};
            if (o.data.user) {
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
