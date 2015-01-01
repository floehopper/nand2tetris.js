var chai = require("chai");
var expect = chai.expect;

var Not16 = require("../lib/not16");

describe("Not16", function() {
  var not16;

  beforeEach(function() {
    not16 = new Not16();
  });

  it("sets outputs high when inputs are low", function() {
    for (var index = 0; index < 16; index++) {
      not16.setInputValue("in[" + index + "]", 0);
    };
    not16.evaluate();
    for (var index = 0; index < 16; index++) {
      expect(not16.getOutputValue("out[" + index + "]")).to.eql(1);
    };
  });

  it("sets outputs low when inputs are high", function() {
    for (var index = 0; index < 16; index++) {
      not16.setInputValue("in[" + index + "]", 1);
    };
    not16.evaluate();
    for (var index = 0; index < 16; index++) {
      expect(not16.getOutputValue("out[" + index + "]")).to.eql(0);
    };
  });
});
