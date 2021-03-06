var CrmModule, Invoices, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Invoices = (function(_super) {
  __extends(Invoices, _super);

  function Invoices() {
    return Invoices.__super__.constructor.apply(this, arguments);
  }

  Invoices.prototype.name = 'Invoices';

  Invoices.prototype.getMyRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getRecords = function(_query, cb) {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getRecordById = function(id, cb) {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.updateRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getSearchRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getSearchRecordsByPDC = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.deleteRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getFields = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.updateRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.getUsers = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.uploadFile = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.downloadFile = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.deleteFile = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.uploadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.downloadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Invoices.prototype.deletePhoto = function() {
    throw new Error('Not Implemented');
  };

  return Invoices;

})(CrmModule);

module.exports = Invoices;
