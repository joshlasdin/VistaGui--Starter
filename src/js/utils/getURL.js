"use strict";

const API = require("./vendor");

module.exports = {
	getURL: function() {
		let url = API.BaseURI;
		url = url + "/" + API.map["facilities"];
		return url;
	}
};