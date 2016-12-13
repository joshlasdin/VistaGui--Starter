const Backbone  = require("backbone");
const Radio     = require("backbone.radio");
const LoginView = require("./view");
const FacilitiesCollection = require("../../entities/facilities/collection");

module.exports = Backbone.Blazer.Route.extend({
	prepare(routeData) {
		routeData.posts = new FacilitiesCollection();
		routeData.f1 = routeData.posts.fetch();
		return Promise.all([routeData.f1]);
	},

	execute(routeData) {	// doesn't get called till f1 and f2 are complete
		Radio.request("root", "body", new LoginView());
	}
});
