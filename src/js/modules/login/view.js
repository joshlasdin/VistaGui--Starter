const Marionette = require("backbone.marionette");

module.exports = Marionette.View.extend({
	className: "starter-template",
	template: require("./template.hbs")
});
