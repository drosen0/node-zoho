var Request, Response, request, url, _;

request = require('request');

url = require('url');

_ = require('underscore');

Response = require('./response');

Request = (function() {
  Request.prototype.response = null;

  function Request(module, _request) {
    this.module = module;
    this._request = _request;
    if (!this.module) {
      throw new Error('Requires Zoho Module');
    }
    if (!this._request) {
      throw new Error('Requires request');
    }
    return;
  }

  Request.prototype.request = function(cb) {
    var options;
    options = _.pick(this._request, ['method']);
    options.uri = url.format(this._request);
    return request(options, (function(_this) {
      return function(error, response, body) {
        _this.response = new Response(response);
        if (error) {
          return cb(error, null);
        } else {
          return _this.response.parseBody(body, cb);
        }
      };
    })(this));
  };

  return Request;

})();

module.exports = Request;
