const bb = require("backbone");
const Radio = require("backbone.radio");
const IndexView = require("./view");

module.exports = bb.Blazer.Route.extend({
	execute() {
		Radio.request("root", "body", new IndexView());
	}
});
