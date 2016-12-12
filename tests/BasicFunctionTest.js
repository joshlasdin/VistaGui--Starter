"use strict";
const config   = require("config");
const $        = require("../gulp/config");
const m        = require($.config.test.tstPath+"/utils/ExampleMathOperation");

describe("Simple Math Test", function(){
	it("simple addition should work", function(done) {
		$.chai.expect(m.MathFnc1(1, 1)).to.equal(2);
		$.chai.expect(m.MathFnc1(2, 2)).to.equal(4);
		done();
	});
	it("simple multiplication should work", function(done) {
		$.chai.expect(m.MathFnc2(1, 1)).to.equal(1);
		$.chai.expect(m.MathFnc2(2, 2)).to.equal(4);
		$.chai.expect(m.MathFnc2(4, 4)).to.equal(16);
		done();		
	});		
});
