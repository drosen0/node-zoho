var CrmModule, Potentials, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Potentials = (function(_super) {
  __extends(Potentials, _super);

  function Potentials() {
    return Potentials.__super__.constructor.apply(this, arguments);
  }

  Potentials.prototype.name = 'Potentials';

  Potentials.prototype.getMyRecords = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.getSearchRecordsByPDC = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.deleteRecords = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.convertLead = function(lead_id, options, cb) {
    var defaults, query, records, request, url;
    if (!lead_id) {
      throw new Error('Requires a Lead Id');
    }
    if (!options) {
      throw new Error('Requires an options');
    }
    defaults = {
      createPotential: false,
      assignTo: null,
      notifyLeadOwner: true,
      notifyNewEntityOwner: true
    };
    _.defaults(options, options);
    records = [_.pick(options, ['createPotential', 'assignTo', 'notifyLeadOwner', 'notifyNewEntityOwner'])];
    if (options.createPotential === true && !_.isObject(options.potential)) {
      throw new Error('Requires a potential');
    } else if (options.createPotential === true) {
      records.push(options.potential);
    }
    query = {
      leadId: lead_id,
      newFormat: 1,
      xmlData: this.build(records)
    };
    options = {
      method: 'POST'
    };
    url = this.buildUrl(query, ['convertLead'], options);
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

  Potentials.prototype.getRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.updateRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.getUsers = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.uploadFile = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.downloadFile = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.deleteFile = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.uploadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.downloadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Potentials.prototype.deletePhoto = function() {
    throw new Error('Not Implemented');
  };

  return Potentials;

})(CrmModule);

module.exports = Potentials;
