var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/Gate");
var Not16 = Gate.lookup("Not16");

describe("Not16", function() {
  var not16;

  beforeEach(function() {
    not16 = new Not16();
  });

  it("sets outputs high when inputs are low", function() {
    for (var index = 0; index < 16; index++) {
      not16.setInputValue("in[" + index + "]", 0);
    };
    for (var index = 0; index < 16; index++) {
      expect(not16.getOutputValue("out[" + index + "]")).to.eql(1);
    };
  });

  it("sets outputs low when inputs are high", function() {
    for (var index = 0; index < 16; index++) {
      not16.setInputValue("in[" + index + "]", 1);
    };
    for (var index = 0; index < 16; index++) {
      expect(not16.getOutputValue("out[" + index + "]")).to.eql(0);
    };
  });
});
