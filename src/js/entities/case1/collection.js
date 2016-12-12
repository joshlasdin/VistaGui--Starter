const Backbone  = require("backbone");
const CaseModel = require("./model");
const API       = require("../../api");

module.exports = Backbone.Collection.extend({
	url: API.getURL("Case"),
	model: CaseModel
});
