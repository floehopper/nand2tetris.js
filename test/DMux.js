var chai = require("chai");
var expect = chai.expect;

var Gate = require("../lib/Gate");
var DMux = Gate.lookup("DMux");

describe("DMux", function() {
  var dmux;

  beforeEach(function() {
    dmux = new DMux();
  });

  describe("when output a is selected", function() {
    beforeEach(function() {
      dmux.setInputValue("sel", 0);
    });

    it("sets output a low when input is low", function() {
      dmux.setInputValue("in", 0);
      dmux.evaluate();
      expect(dmux.getOutputValue("a")).to.eql(0);
    });

    it("sets output a high when input is high", function() {
      dmux.setInputValue("in", 1);
      dmux.evaluate();
      expect(dmux.getOutputValue("a")).to.eql(1);
    });
  });

  describe("when output b is selected", function() {
    beforeEach(function() {
      dmux.setInputValue("sel", 1);
    });

    it("sets output b low when input is low", function() {
      dmux.setInputValue("in", 0);
      dmux.evaluate();
      expect(dmux.getOutputValue("b")).to.eql(0);
    });

    it("sets output b high when input is high", function() {
      dmux.setInputValue("in", 1);
      dmux.evaluate();
      expect(dmux.getOutputValue("b")).to.eql(1);
    });
  });
});
