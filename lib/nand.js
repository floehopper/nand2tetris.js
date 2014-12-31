var Gate = require("../lib/gate");

var Nand = function() {
  Gate.call(this, ["a", "b"], ["out"]);
};
Nand.prototype = Object.create(Gate.prototype);
Nand.prototype.constructor = Nand;
Nand.prototype.evaluate = function() {
  var newValue = 1 - (this.getInputValue("a") & this.getInputValue("b"));
  this.setOutputValue("out", newValue);
};
Gate.classes["Nand"] = Nand;

module.exports = Nand;
