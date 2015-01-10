var Gate = require("../lib/gate");
var JSGate = require("../lib/JSGate");

var Nand = function() {
  JSGate.call(this, ["a", "b"], ["out"], function() {
    var newValue = 1 - (this.getInputValue("a") & this.getInputValue("b"));
    this.setOutputValue("out", newValue);
  });
};
Nand.prototype = Object.create(JSGate.prototype);
Nand.prototype.constructor = Nand;
Gate.classes["Nand"] = Nand;

module.exports = Nand;
