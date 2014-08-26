_ = require('underscore')
xml2js = require("xml2js")

CrmModule = require('./crm-module')
Request = require('../../request')

class Potentials extends CrmModule
  name: 'Potentials'

module.exports = Potentials
