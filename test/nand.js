var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/gate");
var Nand = Gate.lookup("nand");

describe("Nand", function() {
  var nand;

  beforeEach(function() {
    nand = new Nand();
  });

  it("sets output high when both inputs are low", function() {
    nand.setInputValue("a", 0);
    nand.setInputValue("b", 0);
    nand.evaluate();
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when one input is low", function() {
    nand.setInputValue("a", 0);
    nand.setInputValue("b", 1);
    nand.evaluate();
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when other input is low", function() {
    nand.setInputValue("a", 1);
    nand.setInputValue("b", 0);
    nand.evaluate();
    expect(nand.getOutputValue("out")).to.eql(1);
  });

  it("sets output low when both inputs are high", function() {
    nand.setInputValue("a", 1);
    nand.setInputValue("b", 1);
    nand.evaluate();
    expect(nand.getOutputValue("out")).to.eql(0);
  });
});
