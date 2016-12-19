const Backbone  = require("backbone");
const API       = require("../../../api");

module.exports = Backbone.Model.extend({
  urlRoot: API.getURL("PatientSSN"),
  defaults: {
    name: null,
    dfn: null,
    localPid: null
  }
});
