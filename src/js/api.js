"use strict";

/**
 * Here's where any constants for the API should be going
 */

const APIRoutes = {

  // Base
	"API_Base": "https://vsgui.dbitpro.com:8443/",

  // Sample
  "SampleAPI": "jsonplaceholder.typicode.com/posts",

  // API calls below here DO NOT requre access token
	"Authenticate": "authenticate",
	"Facilities": "facilities",

  // API calls below here require access token
	"FacilitiesList": "v1/facilities/list",
	"Case": "v1/case",
	"PatientLastFive": "v1/patient/five/",
	"PatientId": "v1/patient/",
	"PatientSSN": "v1/patient/ssn/",
	"PatientSurgeryDetails": "/v1/surgery/"
};

const getURL = function(apiName) {
	if ("SampleAPI" == apiName) {
		return APIRoutes[apiName];
	}
	let url = APIRoutes.API_Base + APIRoutes[apiName];
	console.log("Returning url = ", url);
	return url;
};

module.exports = {
	getURL: getURL
};
