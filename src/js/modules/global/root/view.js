const mn = require("backbone.marionette");
const Radio = require("backbone.radio");
const HeaderView = require("../header/view");
const FooterView = require("../footer/view");

const SidebarView = require("../sidebar/view");
const IndexView = require("../../index/view");

module.exports = mn.View.extend({
	initialize() {
		this._channel = Radio.channel("root");
	},

	template: require("./template.hbs"),

	regions: {
		header:  { el: "#r-header", replaceElement: true },
		footer:  { el: "#footer"},
		sidebar: { el: "#sidebar"},
		body: { el: "#r-body" }
	},

	onRender() {
		this.showChildView("header", new HeaderView());
		this.showChildView("footer", new FooterView());
		this.showChildView("sidebar", new SidebarView());
		this.showChildView("body", new IndexView());
	},

	onAttach() {
		this._channel.reply({
			body: view => this.showChildView("body", view),
		}, this);
	},

	onBeforeDestroy() {
		this._channel.stopReplying("body");
	}
});
