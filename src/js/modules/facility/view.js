// View to render a single blog post based on the template and the data pulled via the route.
const mn = require("backbone.marionette");

module.exports = mn.View.extend({
	className: "starter-template",
	template: require("./template.hbs")
});
