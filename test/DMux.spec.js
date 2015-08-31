var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("DMux", function() {
  var dmux;

  beforeEach(function() {
    var resolver = new Resolver();
    var definition = resolver.resolvePart("DMux");
    dmux = definition.buildModel();
  });

  describe("when output a is selected", function() {
    beforeEach(function() {
      dmux.setInputValue("sel", 0);
    });

    it("sets output a low when input is low", function() {
      dmux.setInputValue("in", 0);
      expect(dmux.getOutputValue("a")).to.eql(0);
    });

    it("sets output a high when input is high", function() {
      dmux.setInputValue("in", 1);
      expect(dmux.getOutputValue("a")).to.eql(1);
    });
  });

  describe("when output b is selected", function() {
    beforeEach(function() {
      dmux.setInputValue("sel", 1);
    });

    it("sets output b low when input is low", function() {
      dmux.setInputValue("in", 0);
      expect(dmux.getOutputValue("b")).to.eql(0);
    });

    it("sets output b high when input is high", function() {
      dmux.setInputValue("in", 1);
      expect(dmux.getOutputValue("b")).to.eql(1);
    });
  });
});
