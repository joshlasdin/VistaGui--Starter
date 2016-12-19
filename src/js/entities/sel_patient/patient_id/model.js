const Backbone  = require("backbone");
const API       = require("../../../api");

module.exports = Backbone.Model.extend({
  urlRoot: API.getURL("PatientId"),
  defaults: {
    name: null,
    gender: null,
    dob: null,
    ssn: null,
    age: null,
    localPid: null
  }
});

