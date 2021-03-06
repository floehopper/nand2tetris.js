var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("Or", function() {
  var or;

  beforeEach(function() {
    var resolver = new Resolver("lib");
    var definition = resolver.resolvePart("Or");
    or = definition.buildModel();
  });

  it("sets output low when both inputs are low", function() {
    or.setInputValue("a", 0);
    or.setInputValue("b", 0);
    expect(or.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when one input is high", function() {
    or.setInputValue("a", 0);
    or.setInputValue("b", 1);
    expect(or.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when other input is high", function() {
    or.setInputValue("a", 1);
    or.setInputValue("b", 0);
    expect(or.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when both inputs are high", function() {
    or.setInputValue("a", 1);
    or.setInputValue("b", 1);
    expect(or.getOutputValue("out")).to.eql(1);
  });
});
