var Gate = require("../lib/Gate");
var JSGate = require("../lib/JSGate");

var Nand = function() {
  JSGate.call(this, ["a", "b"], ["out"], function() {
    var newValue = 1 - (this.getInputValue("a") & this.getInputValue("b"));
    this.setOutputValue("out", newValue);
  });
};
Nand.prototype = Object.create(JSGate.prototype);
Nand.prototype.constructor = Nand;

module.exports = Nand;
