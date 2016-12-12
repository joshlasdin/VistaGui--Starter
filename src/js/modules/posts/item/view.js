const mn = require("backbone.marionette");

module.exports = mn.View.extend({
	className: "col-md-8 col-md-offset-2",
	template: require("./template.hbs")
});
