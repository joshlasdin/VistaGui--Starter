const bb = require("backbone");
const Radio = require("backbone.radio");
const PostView = require("./view");
const PostModel = require("../../entities/posts/model");

module.exports = bb.Blazer.Route.extend({
	prepare(routeData) {
		const [id] = routeData.params;
		routeData.post = new PostModel({ id });
		return routeData.post.fetch();
	},

	execute({ post }) {
		Radio.request("root", "body", new PostView({
			model: post
		}));
	}
});
