// Renders the entire page body
const bb = require("backbone");
const Radio = require("backbone.radio");
const PostsView = require("./view");
const PostsCollection = require("../../entities/posts/collection");

module.exports = bb.Blazer.Route.extend({
	prepare(routeData) {
		routeData.posts = new PostsCollection();
		return routeData.posts.fetch();
	},

	execute(routeData) {
		Radio.request("root", "body", new PostsView({
			collection: routeData.posts
		}));
	}
});
