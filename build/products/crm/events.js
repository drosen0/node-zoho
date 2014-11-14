var CrmModule, Events, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Events = (function(_super) {
  __extends(Events, _super);

  function Events() {
    return Events.__super__.constructor.apply(this, arguments);
  }

  Events.prototype.name = 'Events';

  Events.prototype.getMyRecords = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.getSearchRecordsByPDC = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.deleteRecords = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.convertLead = function(lead_id, options, cb) {
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

  Events.prototype.getRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.updateRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.getUsers = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.uploadFile = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.downloadFile = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.deleteFile = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.uploadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.downloadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Events.prototype.deletePhoto = function() {
    throw new Error('Not Implemented');
  };

  return Events;

})(CrmModule);

module.exports = Events;
