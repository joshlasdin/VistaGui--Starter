"use strict";
/*
 * Here's where any consts for the API should be going
 */

const APIRoutes = {
	"API_Base": "https://",
	"SampleAPI": "jsonplaceholder.typicode.com/posts",
	"Facilities": "vsgui.dbitpro.com:8443/facilities",					// no token needed

			// API calls below here require token
	"FacilitiesList": "vsgui.dbitpro.com:8443/v1/facilities/list",
	"Case": "vsgui.dbitpro.com:8443/v1/case",
	"Authentication": ""
};

const getURL = function(apiName) {
	let url = APIRoutes.API_Base + APIRoutes[apiName];
	console.log("Returning url = ", url);
	return url;
}

module.exports = {
	getURL: getURL
}
