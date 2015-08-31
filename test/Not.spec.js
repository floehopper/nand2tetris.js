var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/Gate");
var Not = Gate.lookup("Not");

describe("Not", function() {
  var not;

  beforeEach(function() {
    not = new Not();
  });

  it("sets output high when input is low", function() {
    not.setInputValue("in", 0);
    expect(not.getOutputValue("out")).to.eql(1);
  });

  it("sets output low when input is high", function() {
    not.setInputValue("in", 1);
    expect(not.getOutputValue("out")).to.eql(0);
  });
});