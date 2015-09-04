var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("And", function() {
  var and;

  beforeEach(function() {
    var resolver = new Resolver("lib");
    var definition = resolver.resolvePart("And");
    and = definition.buildModel();
  });

  it("sets output low when both inputs are low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 0);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when one input is low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 1);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when other input is low", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 0);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when both inputs are high", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 1);
    expect(and.getOutputValue("out")).to.eql(1);
  });
});
