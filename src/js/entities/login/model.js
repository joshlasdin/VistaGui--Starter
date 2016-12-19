const Backbone  = require("backbone");
const API       = require("../../api");

module.exports = Backbone.Model.extend({
  urlRoot: API.getURL("Authenticate"),
  defaults: {
    success: null,
    message: null,
    token: null
  }
});
