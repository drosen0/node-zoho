var BaseModule, _;

_ = require('underscore');

BaseModule = (function() {
  BaseModule.prototype.name = "BaseModule";

  BaseModule.prototype.format = "xml";

  BaseModule.prototype.scope = "private";

  function BaseModule(product) {
    this.product = product;
    if (!this.product) {
      throw new Error('Requires product');
    }
    return;
  }

  BaseModule.prototype.getUrlParts = function() {
    return [this.scope, this.format, this.name];
  };

  BaseModule.prototype.buildUrl = function(query, path, options) {
    var url;
    if (query == null) {
      query = {};
    }
    if (path == null) {
      path = [];
    }
    if (options == null) {
      options = {};
    }
    url = this.product.getBaseUrl();
    url.method = 'POST';
    url.path = url.path.concat(this.getUrlParts());
    url.path = url.path.concat(path);
    url.pathname = "/" + url.path.join("/");
    _.extend(url.query, query);
    return url;
  };

  return BaseModule;

})();

module.exports = BaseModule;
