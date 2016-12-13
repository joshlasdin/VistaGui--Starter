const bb = require("backbone");
const Radio = require("backbone.radio");
const FacilitiesView = require("./view");
const FacilitiesCollection = require("../../entities/facilities/collection");

module.exports = bb.Blazer.Route.extend({
	prepare(routeData) {
		routeData.posts = new FacilitiesCollection();
		return routeData.posts.fetch({ "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NDb2RlIjoiVlMyMDE3IiwidmVyaWZ5IjoiVlMyMDE3KCgoIiwic3RhdGlvbklkIjoiNjQ4IiwiZXhwIjoxNDgxNTc0MjkzLCJpc3MiOiJ2aXN0YS1zdXJnZXJ5LWFwaSIsImF1ZCI6InZpc3RhLXN1cmdlcnktYXBpIiwiaWF0IjoxNDgxNTcyNDkzfQ.E4U9-V8uXMPzDWshLVTC7mOeXx_i-9BKcXLKRqS23Pg" });
	},

	execute(routeData) {
		Radio.request("root", "body", new FacilitiesView({
			collection: routeData.posts
		}));
	}
});
