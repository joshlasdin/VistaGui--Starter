
const Backbone  = require("backbone");
const Radio     = require("backbone.radio");
const LoginView = require("./view");
const FacilitiesCollection = require("../../entities/facilities/collection");

module.exports = Backbone.Blazer.Route.extend({
	prepare(routeData) {
		routeData.facilities = new FacilitiesCollection();
		return routeData.facilities.fetch();
	},

	execute({ facilities }) {
		Radio.request("root", "body", new LoginView({ facilities }));
	}
});
