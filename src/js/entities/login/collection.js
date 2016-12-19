const Backbone      = require("backbone");
const FacilityModel = require("./model");
const API           = require("../../api");

module.exports = Backbone.Collection.extend({
  url: API.getURL("Authenticate"),
  model: AuthenticateModel
});
