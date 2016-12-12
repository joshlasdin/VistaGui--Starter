const mn = require("backbone.marionette");

module.exports = mn.View.extend({
	className: "starter-template",
	template: require("./template.hbs")
});
