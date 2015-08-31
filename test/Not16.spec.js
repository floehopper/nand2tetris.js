var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("Not16", function() {
  var not16;

  beforeEach(function() {
    var resolver = new Resolver();
    var definition = resolver.resolvePart("Not16");
    not16 = definition.buildModel();
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
