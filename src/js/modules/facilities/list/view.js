const mn = require("backbone.marionette");
const FacilityItemView = require("../item/view");

module.exports = mn.CollectionView.extend({
	className: "row",
	childView: FacilityItemView
});
