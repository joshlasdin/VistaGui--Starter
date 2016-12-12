"use strict";
const config   = require("config");
const $        = require("../gulp/config");
const m        = require($.config.test.tstPath+"/utils/getURL");
const path     = "/";

const url = m.getURL();
const BaseRoute = url;

describe("Simple Unit Test", function(){
	it("1 should equal 1", function(done) {
		$.chai.expect(1).to.equal(1);
		done();		
	});	
	it("2 should be greater than 1", function() {
		$.chai.expect(2).to.be.greaterThan(1);
	});
	it("should have a defined folder structure", function(done) {
		$.chai.expect($.chai_dir("src")).to.exist;
		$.chai.expect($.chai_dir("src/scripts")).to.exist;
		$.chai.expect($.chai_dir("src/scripts/utils")).to.exist;
		done();
	});
});
