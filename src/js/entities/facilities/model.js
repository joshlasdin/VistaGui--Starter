const Backbone  = require("backbone");
const API       = require("../../api");

module.exports = Backbone.Model.extend({
	urlRoot: API.getURL("Facilities"),
	defaults: {
		"_id": "",
		"stationID": "",
		"facilityName": "",
		"state": "",
		"complexityLevel": "",
		"visn": "",
		"facilitySize": ""
  }
});
