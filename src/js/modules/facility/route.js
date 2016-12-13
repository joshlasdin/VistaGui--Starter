const config = require("config");
const bb = require("backbone");
const Radio = require("backbone.radio");
const FacilityView = require("./view");
const FacilityModel = require("../../entities/facilities/model");
const AuthToken = config.get("JWT_Token");

module.exports = bb.Blazer.Route.extend({
	prepare(routeData) {
		const [id] = routeData.params;
		routeData.post = new FacilityModel({ id });
		let rd = routeData.post.fetch( { "authorization": AuthToken } );
		console.log(rd);
		debugger;
		return rd;
	},

	execute({ Facility }) {
		Radio.request("root", "body", new FacilityView({ model: Facility }));
	}
});
