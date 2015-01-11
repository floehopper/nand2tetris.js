var Gate = require("../lib/Gate");
var JSGate = require("../lib/JSGate");

var Nand = function() {
  var that = this;
  JSGate.call(this, ["a", "b"], ["out"], function() {
    var newValue = 1 - (this.getInputValue("a") & this.getInputValue("b"));
    this.setOutputValue("out", newValue);
  });

  this.getInput("a").on("change:value", function() {
    that.evaluate();
  });

  this.getInput("b").on("change:value", function() {
    that.evaluate();
  });
};
Nand.prototype = Object.create(JSGate.prototype);
Nand.prototype.constructor = Nand;

module.exports = Nand;
