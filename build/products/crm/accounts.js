var Accounts, CrmModule, Request, xml2js, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('underscore');

xml2js = require("xml2js");

CrmModule = require('./crm-module');

Request = require('../../request');

Accounts = (function(_super) {
  __extends(Accounts, _super);

  function Accounts() {
    return Accounts.__super__.constructor.apply(this, arguments);
  }

  Accounts.prototype.name = 'Accounts';

  return Accounts;

})(CrmModule);

module.exports = Accounts;
