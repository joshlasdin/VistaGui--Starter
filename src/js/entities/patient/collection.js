/**
 * Created by vrspraveenatluri on 12/14/16.
 */
const Backbone      = require("backbone");
const PatientIdModel = require("./model");
const API           = require("../../api");

module.exports = Backbone.Collection.extend({
  url: API.getURL("PatientId"),
  model: PatientIdModel
});
