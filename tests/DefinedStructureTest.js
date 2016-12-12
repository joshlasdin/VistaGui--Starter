"use strict";
const config   = require("config");
const $        = require("../gulp/config");
const m        = require($.config.test.tstPath+"/utils/getURL");


describe("MVC defined Folder Structure", function(){
	it("should have a defined folder structure", function(done) {
		$.chai.expect($.chai_dir("src")).to.exist;
		$.chai.expect($.chai_dir("src/scripts")).to.exist;
		$.chai.expect($.chai_dir("src/scripts/utils")).to.exist;
		done();
	});
});
