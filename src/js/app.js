const Backbone   = require("backbone");
const Marionette = require("backbone.marionette");
const Router     = require("./router");
const RootView   = require("./modules/global/root/view");

module.exports = Marionette.Application.extend({
	region: "#app",

	onStart() {
		this.router = new Router();
		this.showView(new RootView());

        // Invoke routing
		Backbone.Intercept.start();
		Backbone.history.start({ pushState: true });
	}
});
