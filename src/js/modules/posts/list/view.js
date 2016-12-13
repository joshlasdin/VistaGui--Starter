// Renders the bootstrap row (not table row) of all the blog posts
const mn = require("backbone.marionette");
const PostItemView = require("../item/view");

module.exports = mn.CollectionView.extend({
	className: "row",
	childView: PostItemView
});
