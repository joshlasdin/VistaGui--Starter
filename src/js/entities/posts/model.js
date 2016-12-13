const Backbone  = require("backbone");
const API       = require("../../api");

module.exports = Backbone.Model.extend({
	urlRoot: API.getURL("SampleAPI"),
	defaults: {
		"userId": "",
		"id": "",
		"title": "",
		"body": ""
  }
});
