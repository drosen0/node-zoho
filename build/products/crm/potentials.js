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

  return Potentials;

})(CrmModule);

module.exports = Potentials;
