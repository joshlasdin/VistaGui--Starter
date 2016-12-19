/**
 * Created by vrspraveenatluri on 12/14/16.
 */
const Backbone  = require("backbone");
const API       = require("../../api");

module.exports = Backbone.Model.extend({
  urlRoot: API.getURL("PatientId"),
  defaults: {
    "dfn": "",
    "name": "",
    "localPid": "",
    "gender": "",
    "dob": "",
    "ssn": "",
    "age": ""
  }
});
