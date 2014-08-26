_ = require('underscore')
xml2js = require("xml2js")

CrmModule = require('./crm-module')
Request = require('../../request')

class Contacts extends CrmModule
  name: 'Contacts'

module.exports = Contacts
