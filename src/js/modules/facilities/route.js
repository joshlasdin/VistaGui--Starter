const bb = require("backbone");
const Radio = require("backbone.radio");
const FacilitiesView = require("./view");
const FacilitiesCollection = require("../../entities/facilities/collection");

module.exports = bb.Blazer.Route.extend({
	prepare(routeData) {
		routeData.posts = new FacilitiesCollection();
		return routeData.posts.fetch();
	},

	execute(routeData) {
		Radio.request("root", "body", new FacilitiesView({
			collection: routeData.posts
		}));
	}
});
