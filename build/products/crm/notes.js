var CrmModule, Notes, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Notes = (function(_super) {
  __extends(Notes, _super);

  function Notes() {
    return Notes.__super__.constructor.apply(this, arguments);
  }

  Notes.prototype.name = 'Notes';

  Notes.prototype.getMyRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getRecords = function(_query, cb) {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getRecordById = function(id, cb) {
    throw new Error('Not Implemented');
  };

  Notes.prototype.updateRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getSearchRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getSearchRecordsByPDC = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.deleteRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getFields = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.updateRelatedRecords = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.getUsers = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.uploadFile = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.downloadFile = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.deleteFile = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.uploadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.downloadPhoto = function() {
    throw new Error('Not Implemented');
  };

  Notes.prototype.deletePhoto = function() {
    throw new Error('Not Implemented');
  };

  return Notes;

})(CrmModule);

module.exports = Notes;
