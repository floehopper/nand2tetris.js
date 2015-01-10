var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/gate");
var Mux = Gate.lookup("mux");

describe("Mux", function() {
  var mux;

  beforeEach(function() {
    mux = new Mux();
  });

  describe("when input a is selected", function() {
    beforeEach(function() {
      mux.setInputValue("sel", 0);
    });

    it("sets output low when a is low and b is low", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 0);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output low when a is low and b is high", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 1);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is high and b is low", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 0);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(1);
    });

    it("sets output high when a is high and b is high", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 1);
      mux.evaluate();
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
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is low and b is high", function() {
      mux.setInputValue("a", 0);
      mux.setInputValue("b", 1);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(1);
    });

    it("sets output low when a is high and b is low", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 0);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(0);
    });

    it("sets output high when a is high and b is high", function() {
      mux.setInputValue("a", 1);
      mux.setInputValue("b", 1);
      mux.evaluate();
      expect(mux.getOutputValue("out")).to.eql(1);
    });
  });
});
