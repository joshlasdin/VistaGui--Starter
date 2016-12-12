"use strict";
const config   = require("config");
const $        = require("../gulp/config.js");
const m        = require($.config.test.tstPath + "/utils/getURL.js");

const url = m.getURL();
const BaseRoute = url;
const FacilitiesRoute = config.BASE_ROUTE + config.FACILITIES_ROUTE;

describe("REST_GET_Facilities - Simple Request to get a list of facilities from the API", function(){
	let app;
	let aToken = "";

	it("should get a JSON Object", function(done){
		console.log("Base Route = ", BaseRoute);
		console.log("Facilities Route = ", FacilitiesRoute);
		let request = $.request(url);

		request.get(FacilitiesRoute)
			.end(function (err, res) {
				if (err) {
					return done(err);
				}

				$.chai.assert.equal(res.status, 200, "Did not get a 200 status");
				$.chai.assert.equal(res.header["content-type"], "application/json; charset=utf-8", "Header failure");
				$.chai.assert.equal(null, err, "Received an error condition - ", err);
				done();
			});
	});
});
