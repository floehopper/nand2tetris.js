var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("Nand", function() {
  var nand;

  beforeEach(function() {
    var resolver = new Resolver();
    var definition = resolver.resolvePart("Nand");
    nand = definition.buildModel();
  });

  it("sets output high when both inputs are low", function() {
    nand.setInputValue("a", 0);
    nand.setInputValue("b", 0);
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when one input is low", function() {
    nand.setInputValue("a", 0);
    nand.setInputValue("b", 1);
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when other input is low", function() {
    nand.setInputValue("a", 1);
    nand.setInputValue("b", 0);
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output low when both inputs are high", function() {
    nand.setInputValue("a", 1);
    nand.setInputValue("b", 1);
    expect(nand.getOutputValue("out")).to.eql(0);
  });
});
