const mn = require("backbone.marionette");
const FacilityListView = require("./list/view");

module.exports = mn.View.extend({
	template: require("./template.hbs"),

	regions: {
		list: { el: ".r-post-list", replaceElement: true },
	},

	onRender() {
		this.showChildView("list", new FacilityListView({
			collection: this.collection
		}));
	}
});
