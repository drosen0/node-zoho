var Zoho, async, https, url, xml2js, _;

url = require("url");

https = require("https");

_ = require("underscore");

async = require("async");

xml2js = require("xml2js");

Zoho = (function() {
  Zoho.prototype.authToken = null;

  function Zoho(options) {
    if (options == null) {
      options = {};
    }
    this.authDefaults = {
      host: "accounts.zoho.com",
      port: 443,
      path: "/apiauthtoken/nb/create?SCOPE=ZohoCRM/crmapi"
    };
    if (options != null ? options.authToken : void 0) {
      this.authToken = options != null ? options.authToken : void 0;
    }
    return this;
  }

  Zoho.prototype.getProduct = function(productName) {
    var Crm;
    Crm = require('./products/crm');
    return new Crm(this);
  };

  Zoho.prototype.execute = function(product, module, call) {
    var args, moduleInstance, productInstance;
    args = Array.prototype.slice.call(arguments);
    productInstance = this.getProduct(product);
    moduleInstance = productInstance.getModule(module);
    return moduleInstance[call].apply(moduleInstance, args.slice(3));
  };

  return Zoho;

})();

module.exports = Zoho;
