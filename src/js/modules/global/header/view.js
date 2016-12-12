const mn = require("backbone.marionette");

module.exports = mn.View.extend({
	tagName: "nav",
	className: "navbar navbar-fixed-top",
	template: require("./template.hbs")
});
