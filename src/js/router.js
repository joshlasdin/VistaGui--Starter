const Backbone = require("backbone");
const AboutRoute      = require("./modules/about/route");
const IndexRoute      = require("./modules/index/route");
const PostsRoute      = require("./modules/posts/route");
const PostRoute       = require("./modules/post/route");

const Case1Route      = require("./modules/case1/route");
const LoginRoute      = require("./modules/login/route");
const SelPatientRoute = require("./modules/sel_patient/route");

module.exports = Backbone.Blazer.Router.extend({
	routes: {
		"": new IndexRoute(),
		"about/": new AboutRoute(),
		"posts/": new PostsRoute(),
		"posts/:id/": new PostRoute(),

		"case1/": new Case1Route(),
		"login/": new LoginRoute(),
		"SelPatientRoute/": new SelPatientRoute()
	}
});
