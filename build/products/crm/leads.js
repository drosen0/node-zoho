var CrmModule, Leads, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Leads = (function(_super) {
  __extends(Leads, _super);

  function Leads() {
    return Leads.__super__.constructor.apply(this, arguments);
  }

  Leads.prototype.name = 'Leads';

  Leads.prototype.getMyRecords = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.getSearchRecords = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.getSearchRecordsByPDC = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.deleteRecords = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.convertLead = function(lead_id, options, cb) {
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

  Leads.prototype.getRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.updateRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.getUsers = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.uploadFile = function(lead_id, file, descriptor, cb) {
    var form, options, query, r, request, url;
    query = {};
    options = {
      method: 'POST'
    };
    url = this.buildUrl(query, ['uploadFile'], options);
    request = new Request(this, url);
    r = request.request((function(_this) {
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
    form = r.form();
    form.append('id', lead_id);
    form.append('content', file, descriptor);
    return r;
  };

  Leads.prototype.downloadFile = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.deleteFile = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.uploadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.downloadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Leads.prototype.deletePhoto = function() {
    throw new Error('Not Implemented');
  };

  return Leads;

})(CrmModule);

module.exports = Leads;
