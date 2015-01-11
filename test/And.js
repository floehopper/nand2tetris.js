var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/Gate");
var And = Gate.lookup("And");

describe("And", function() {
  var nand;

  beforeEach(function() {
    and = new And();
  });

  it("sets output low when both inputs are low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 0);
    and.evaluate();
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when one input is low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 1);
    and.evaluate();
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when other input is low", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 0);
    and.evaluate();
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when both inputs are high", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 1);
    and.evaluate();
    expect(and.getOutputValue("out")).to.eql(1);
  });
});
