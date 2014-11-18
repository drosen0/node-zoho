var BaseProduct;

BaseProduct = (function() {
  BaseProduct.prototype.name = 'base_product';

  function BaseProduct(zoho) {
    this.zoho = zoho;
    if (!this.zoho) {
      throw new Error('Expected object for zoho');
    }
  }

  return BaseProduct;

})();

module.exports = BaseProduct;