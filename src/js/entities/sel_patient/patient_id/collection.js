const Backbone        = require("backbone");
const PatientIdModel  = require("../../patient/model");
const API             = require("../../../api");

module.exports = Backbone.Collection.extend({
  url: API.getURL("PatientId"),
  model: PatientIdModel
});
