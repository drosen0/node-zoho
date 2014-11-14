var Response, xml2js, _;

xml2js = require("xml2js");

_ = require('underscore');

Response = (function() {
  Response.prototype.message = null;

  Response.prototype.type = null;

  Response.prototype.data = null;

  Response.prototype.code = null;

  Response.prototype._response = null;

  Response.prototype._data = null;

  function Response(_response) {
    this._response = _response;
    if (this._response === void 0) {
      throw new Error('Requires response');
    }
    return;
  }

  Response.prototype.isError = function() {
    if (this.code !== null) {
      return true;
    }
    return false;
  };

  Response.prototype.parseBody = function(body, cb) {
    if (!body) {
      throw new Error('Requires body');
    }
    if (!cb) {
      throw new Error('Requires callback');
    }
    this._data = body;
    return xml2js.parseString(this._data, (function(_this) {
      return function(err, data) {
        var error, record, _ref, _ref1, _ref10, _ref11, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        if (err) {
          return cb(err, null);
        } else {
          _this.data = data;
          if ((_ref = _this.data) != null ? (_ref1 = _ref.response) != null ? _ref1.error : void 0 : void 0) {
            error = _this.data.response.error;
            if (_.isArray(error)) {
              error = _.first(error);
            }
            if (error != null ? error.code : void 0) {
              _this.code = error.code;
            }
            if (error != null ? error.message : void 0) {
              _this.message = error.message;
            } else {
              _this.message = "Unknown Error";
            }
            return cb({
              code: _this.code,
              message: _this.message
            }, _this);
          } else if ((_ref2 = _this.data) != null ? (_ref3 = _ref2.response) != null ? _ref3.nodata : void 0 : void 0) {
            error = _this.data.response.nodata;
            if (_.isArray(error)) {
              error = _.first(error);
            }
            if (error != null ? error.code : void 0) {
              _this.code = error.code;
              if (_.isArray(_this.code)) {
                _this.code = _.first(_this.code);
              }
            }
            if (error != null ? error.message : void 0) {
              _this.message = error.message;
              if (_.isArray(_this.message)) {
                _this.message = _.first(_this.message);
              }
            } else {
              _this.message = "Unknown Error";
            }
            return cb(null, _this);
          } else {
            if ((_ref4 = _this.data) != null ? (_ref5 = _ref4.response) != null ? _ref5.result : void 0 : void 0) {
              if (_.isArray((_ref6 = _this.data) != null ? (_ref7 = _ref6.response) != null ? _ref7.result : void 0 : void 0) && ((_ref8 = _this.data) != null ? (_ref9 = _ref8.response) != null ? _ref9.result.length : void 0 : void 0) === 1) {
                record = _.first((_ref10 = _this.data) != null ? (_ref11 = _ref10.response) != null ? _ref11.result : void 0 : void 0);
                if (record != null ? record.message : void 0) {
                  _this.message = record.message;
                }
                if (record != null ? record.recorddetail : void 0) {
                  _this.data = record.recorddetail;
                } else {
                  _this.data = record;
                }
              } else {
                return cb(new Error("Multi result arrays not handled"), _this);
              }
            }
            return cb(null, _this);
          }
        }
      };
    })(this));
  };

  return Response;

})();

module.exports = Response;
