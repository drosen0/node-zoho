_ = require('underscore')
xml2js = require("xml2js")

CrmModule = require('./crm-module')
Request = require('../../request')

class Accounts extends CrmModule
  name: 'Accounts'

module.exports = Accounts
