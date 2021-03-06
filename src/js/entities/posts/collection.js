const Backbone  = require("backbone");
const PostModel = require("./model");
const API       = require("../../api");

module.exports = Backbone.Collection.extend({
	url: API.getURL("SampleAPI"),
	model: PostModel
});
