var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("Not", function() {
  var not;

  beforeEach(function() {
    var resolver = new Resolver("lib");
    var definition = resolver.resolvePart("Not");
    not = definition.buildModel();
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
