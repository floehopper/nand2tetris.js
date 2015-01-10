var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/gate");
var Xor = Gate.lookup("xor");

describe("Xor", function() {
  var xor;

  beforeEach(function() {
    xor = new Xor();
  });

  it("sets output low when both inputs are low", function() {
    xor.setInputValue("a", 0);
    xor.setInputValue("b", 0);
    xor.evaluate();
    expect(xor.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when one input is high", function() {
    xor.setInputValue("a", 0);
    xor.setInputValue("b", 1);
    xor.evaluate();
    expect(xor.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when other input is high", function() {
    xor.setInputValue("a", 1);
    xor.setInputValue("b", 0);
    xor.evaluate();
    expect(xor.getOutputValue("out")).to.eql(1);
  });

  it("sets output low when both inputs are high", function() {
    xor.setInputValue("a", 1);
    xor.setInputValue("b", 1);
    xor.evaluate();
    expect(xor.getOutputValue("out")).to.eql(0);
  });
});
