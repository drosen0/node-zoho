_ = require('underscore')
xml2js = require("xml2js")

CrmModule = require('./crm-module')
Request = require('../../request')

class Quotes extends CrmModule
  name: 'Quotes'

module.exports = Quotes
