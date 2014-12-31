var chai = require("chai");
var expect = chai.expect;

var Not = require("../lib/not");

describe("Not", function() {
  var not;

  beforeEach(function() {
    not = new Not();
  });

  it("sets output high when input is low", function() {
    not.setInputValue("in", 0);
    not.evaluate();
    expect(not.getOutputValue("out")).to.eql(1);
  });

  it("sets output low when input is high", function() {
    not.setInputValue("in", 1);
    not.evaluate();
    expect(not.getOutputValue("out")).to.eql(0);
  });
});
