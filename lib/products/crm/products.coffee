_ = require('underscore')
xml2js = require("xml2js")

CrmModule = require('./crm-module')
Request = require('../../request')

class Products extends CrmModule
  name: 'Products'

module.exports = Products
