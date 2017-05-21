const OriginalXHR = XMLHttpRequest;

class XInterceptor {

  private readonly x: XMLHttpRequest;

  onreadystatechange: (ev?: Event) => any;
  dispatchEvent: (ev: Event) => any;

  responseText: string;
  response: string;
  status: number;
  statusText: string;

  constructor() {
    this.x = new OriginalXHR();
    this.clone()
    this.handleUpdates();
  }

  private handleUpdates() {
    const actual = this.x;

    actual.addEventListener('readystatechange', () => {
      this.responseText = XInterceptor.processors.reduce((p: string, c) => {
        return c(p);
      }, actual.responseText || actual.response);

      this.response = this.responseText;
      this.dispatchEvent(new Event('onreadystatechange'));

      if (this.onreadystatechange) {
        return this.onreadystatechange();
      }
    });
  }

  private clone() {
    this.addProxyGetter();
    this.addProxyGetterSetters();
    this.addProxyPassThroughMethods();
  }

  private addProxyGetter() {
    const actual = this.x;
    ["status", "statusText", "responseType",
      "readyState", "responseXML", "upload"].forEach((item) => {
        Object.defineProperty(this, item, {
          get: function () { return actual[item]; }
        });
      });
  }

  private addProxyGetterSetters() {
    const actual = this.x;
    ["ontimeout, timeout", "withCredentials", "onload", "onerror", "onprogress"].forEach((item) => {
      Object.defineProperty(this, item, {
        get: function () { return actual[item]; },
        set: function (val) { actual[item] = val; }
      });
    });
  }

  private addProxyPassThroughMethods() {
    const actual = this.x;
    ["addEventListener", "send", "open", "abort", "getAllResponseHeaders",
      "getResponseHeader", "overrideMimeType", "setRequestHeader", "dispatchEvent"].forEach((item) => {
        Object.defineProperty(this, item, {
          value: function () { return actual[item].apply(actual, arguments); }
        });
      });
  }

  static processors: ((text: string) => string)[] = [];

  static addProcessor(f: (text: string) => string) {
    this.processors.push(f);
  }
}

window['XMLHttpRequest'] = XInterceptor;

XInterceptor.addProcessor(function (s) {
  if (s) {
    try {
      const o = JSON.parse(s);
      o.data = o.data || {};

      if (o.data.user) {
        o.data.user.can_see_professional_profile = true;

        if (!o.data.user.nanodegrees) {
          o.data.user.nanodegrees = [];
        }
        o.data.user.nanodegrees.push(
          { id: 278822, key: "nd101", locale: "en-us", version: "1.0.0" }
        )
      }

      return JSON.stringify(o);
    } catch (e) {
      return s;
    }
  }
  return s;
});
