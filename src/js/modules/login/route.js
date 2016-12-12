const Backbone  = require("backbone");
const Radio     = require("backbone.radio");
const LoginView = require("./view");

module.exports = Backbone.Blazer.Route.extend({
	execute() {
		Radio.request("root", "body", new LoginView());
	}
});
