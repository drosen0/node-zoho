var BaseProduct, CrmProduct,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

BaseProduct = require('../../base-product');

CrmProduct = (function(_super) {
  __extends(CrmProduct, _super);

  function CrmProduct() {
    return CrmProduct.__super__.constructor.apply(this, arguments);
  }

  CrmProduct.prototype.name = 'crm';

  CrmProduct.prototype.getModules = function() {
    return ['Leads', 'Events'];
  };

  CrmProduct.prototype.getModule = function(module_name) {
    var err, instance, module_class, module_path;
    try {
      module_name = module_name.toLowerCase();
      module_path = "./" + module_name;
      require.resolve(module_path);
      module_class = require(module_path);
    } catch (_error) {
      err = _error;
      throw new Error(err);
    }
    instance = new module_class(this);
    return instance;
  };

  CrmProduct.prototype.getScope = function() {
    return 'crmapi';
  };

  CrmProduct.prototype.getBaseUrl = function() {
    return {
      hostname: 'crm.zoho.com',
      protocol: 'https',
      query: {
        authtoken: this.zoho.authToken,
        scope: this.getScope(),
        version: 2
      },
      path: [this.name]
    };
  };

  return CrmProduct;

})(BaseProduct);

module.exports = CrmProduct;
