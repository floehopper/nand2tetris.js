var chai = require("chai");
var expect = chai.expect;

var Or = require("../lib/or");

describe("Or", function() {
  var or;

  beforeEach(function() {
    or = new Or();
  });

  it("sets output low when both inputs are low", function() {
    or.setInputValue("a", 0);
    or.setInputValue("b", 0);
    or.evaluate();
    expect(or.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when one input is high", function() {
    or.setInputValue("a", 0);
    or.setInputValue("b", 1);
    or.evaluate();
    expect(or.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when other input is high", function() {
    or.setInputValue("a", 1);
    or.setInputValue("b", 0);
    or.evaluate();
    expect(or.getOutputValue("out")).to.eql(1);
  });

  it("sets output high when both inputs are high", function() {
    or.setInputValue("a", 1);
    or.setInputValue("b", 1);
    or.evaluate();
    expect(or.getOutputValue("out")).to.eql(1);
  });
});
