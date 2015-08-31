var chai = require("chai");
var expect = chai.expect;

var Resolver = require("../lib/Resolver");

describe("Mux", function() {
  var mux;

  beforeEach(function() {
    var resolver = new Resolver();
    var definition = resolver.resolvePart("Mux");
    mux = definition.buildModel();
  });

  describe("when input a is selected", function() {
    beforeEach(function() {
      mux.setInputValue("sel", 0);
    });

    it("sets output low when a is low and b is low", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 0);
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output low when a is low and b is high", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 1);
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is high and b is low", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 0);
      expect(mux.getOutputValue("out")).to.eql(1);
    });

    it("sets output high when a is high and b is high", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 1);
      expect(mux.getOutputValue("out")).to.eql(1);
    });
  });

  describe("when input b is selected", function() {
    beforeEach(function() {
      mux.setInputValue("sel", 1);
    });

    it("sets output low when a is low and b is low", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 0);
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is low and b is high", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 1);
      expect(mux.getOutputValue("out")).to.eql(1);
    });

    it("sets output low when a is high and b is low", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 0);
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is high and b is high", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 1);
      expect(mux.getOutputValue("out")).to.eql(1);
    });
  });
});
