var BaseModule, CrmModule, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

BaseModule = require('../../base-module');

Request = require('../../request');

CrmModule = (function(_super) {
  __extends(CrmModule, _super);

  function CrmModule() {
    return CrmModule.__super__.constructor.apply(this, arguments);
  }

  CrmModule.prototype.buildRecord = function(record) {
    var k, result, v;
    if (!_.isObject(record)) {
      throw new Error('Object required');
    }
    result = [];
    for (k in record) {
      v = record[k];
      if (Array.isArray(v)) {
        result.push({
          $: {
            val: k
          },
          product: this.buildRecords(v)
        });
      } else {
        result.push({
          $: {
            val: k
          },
          _: v
        });
      }
    }
    return result;
  };

  CrmModule.prototype.build = function(records) {
    var xmlBuilder, xmlObj, xmlString;
    xmlBuilder = new xml2js.Builder({
      rootName: this.name,
      renderOpts: {
        pretty: false
      },
      xmldec: {
        version: "1.0",
        encoding: "UTF-8"
      }
    });
    xmlObj = {
      row: this.buildRecords(records)
    };
    xmlString = xmlBuilder.buildObject(xmlObj);
    return xmlString;
  };

  CrmModule.prototype.buildRecords = function(records) {
    var index, options, record, record_result, row, rows, _i, _len;
    if (!_.isArray(records)) {
      throw new Error('Requires array of records');
    }
    rows = [];
    for (index = _i = 0, _len = records.length; _i < _len; index = ++_i) {
      record = records[index];
      record_result = this.buildRecord(record);
      options = _.extend({
        type: 'FL'
      }, record._options);
      row = {
        $: {
          no: index + 1
        }
      };
      row[options.type] = record_result;
      rows.push(row);
    }
    return rows;
  };

  CrmModule.prototype.processRecord = function(record) {
    var fl, i, k, r, result, v, _ref;
    result = {};
    if (_.isArray(record)) {
      for (i in record) {
        r = record[i];
        _.extend(result, this.processRecord(r));
      }
    } else if (_.isObject(record)) {
      if (_.has(record, 'FL')) {
        for (k in record) {
          v = record[k];
          if (k === 'FL') {
            for (i in v) {
              fl = v[i];
              if ((fl != null ? (_ref = fl.$) != null ? _ref.val : void 0 : void 0) && (fl != null ? fl._ : void 0)) {
                result[fl.$.val] = fl._;
              }
            }
          }
        }
      } else if (_.has(record, 'success')) {
        record = record.success;
        for (k in record) {
          v = record[k];
          if (k === 'Account' || k === 'Contact' || k === 'Potential') {
            result[k] = {};
            _.each(v, (function(_this) {
              return function(_v) {
                return _.extend(result[k], _this.processRecord(_v));
              };
            })(this));
          }
        }
      } else if (_.has(record, '_') && _.has(record, '$') && _.has(record.$, 'param')) {
        result[record.$.param] = record._;
      } else if (_.has(record, '_') && _.has(record, '$') && _.has(record.$, 'val')) {
        result[record.$.val] = record._;
      }
    }
    return result;
  };

  CrmModule.prototype.processFields = function(record) {
    var c, field, fl, i, result, val, _ref, _val;
    result = {};
    if (_.isObject(record)) {
      if (_.has(record, 'FL')) {
        result = record.$;
        result.fields = [];
        _ref = record.FL;
        for (i in _ref) {
          fl = _ref[i];
          field = fl.$;
          if (_.has(fl, 'val')) {
            _val = fl.val;
            field.val = [];
            for (c in _val) {
              val = _val[c];
              if (_.has(val, '_')) {
                if (_.has(val, '$')) {
                  if (val['$']["default"]) {
                    field["default"] = val['_'];
                  }
                }
                field.val.push(val['_']);
              } else {
                field.val.push(val);
              }
            }
          }
          result.fields.push(field);
        }
      }
    }
    return result;
  };

  CrmModule.prototype.getFields = function(_query, cb) {
    var options, query, request, url;
    query = _.extend({
      newFormat: 1
    }, _query);
    options = {
      method: 'GET'
    };
    url = this.buildUrl(query, ['getFields'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed, row, _data;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          _data = response.data;
          response.data = Array();
          if (_data != null ? _data[_this.name] : void 0) {
            for (row in _data[_this.name].section) {
              processed = _this.processFields(_data[_this.name].section[row]);
              if (processed) {
                response.data.push(processed);
              }
            }
          }
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  CrmModule.prototype.getRecords = function(_query, cb) {
    var options, query, request, url;
    query = _.extend({
      newFormat: 1
    }, _query);
    options = {
      method: 'GET'
    };
    url = this.buildUrl(query, ['getRecords'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed, row, _data;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          _data = response.data;
          response.data = Array();
          if (_data != null ? _data[_this.name] : void 0) {
            for (row in _data[_this.name][0].row) {
              processed = _this.processRecord(_data[_this.name][0].row[row]);
              if (processed) {
                response.data.push(processed);
              }
            }
          }
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  CrmModule.prototype.getRecordById = function(id, cb) {
    var options, query, request, url;
    if (!id) {
      throw new Error('Requires an Id to fetch');
    }
    query = {
      id: id,
      newFormat: 1
    };
    options = {
      method: 'GET'
    };
    url = this.buildUrl(query, ['getRecordById'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed, row, _ref, _ref1;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          if ((_ref = response.data) != null ? _ref.Events : void 0) {
            row = _.first((_ref1 = response.data) != null ? _ref1.Events : void 0);
            processed = _this.processRecord(_.first(row.row));
            response.data = processed;
          }
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  CrmModule.prototype.getSearchRecords = function(_query, cb) {
    var options, query, request, url;
    if (!_.isObject(_query)) {
      throw new Error('Requires a query object');
    }
    query = _.extend({
      newFormat: 1,
      selectColumns: 'All'
    }, _query);
    if (!query.searchCondition) {
      throw new Error('Requires a searchCondition to fetch');
    }
    options = {
      method: 'GET'
    };
    url = this.buildUrl(query, ['getSearchRecords'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed, row, _data;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          _data = response.data;
          response.data = Array();
          if (_data != null ? _data[_this.name] : void 0) {
            for (row in _data[_this.name][0].row) {
              processed = _this.processRecord(_data[_this.name][0].row[row]);
              if (processed) {
                response.data.push(processed);
              }
            }
          }
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  CrmModule.prototype.insertRecords = function(records, cb) {
    var options, query, request, url;
    if (!_.isArray(records)) {
      throw new Error('Requires array of records');
    }
    if (records.length < 1) {
      throw new Error('Requires as least one record');
    }
    query = {
      newFormat: 1,
      xmlData: this.build(records)
    };
    options = {
      method: 'POST'
    };
    url = this.buildUrl(query, ['insertRecords'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          processed = _this.processRecord(response.data);
          response.data = processed;
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  CrmModule.prototype.updateRecords = function(id, records, cb) {
    var options, query, request, url;
    if (!id) {
      throw new Error('Requires an Id to fetch');
    }
    if (!_.isObject(records)) {
      throw new Error('Requires record object');
    }
    query = {
      newFormat: 1,
      id: id,
      xmlData: this.build(records)
    };
    options = {
      method: 'POST'
    };
    url = this.buildUrl(query, ['updateRecords'], options);
    request = new Request(this, url);
    return request.request((function(_this) {
      return function(err, response) {
        var processed;
        if (err) {
          if (_.isFunction(cb)) {
            return cb(err, null);
          }
        } else {
          processed = _this.processRecord(response.data);
          response.data = processed;
          if (_.isFunction(cb)) {
            return cb(null, response);
          }
        }
      };
    })(this));
  };

  return CrmModule;

})(BaseModule);

module.exports = CrmModule;
