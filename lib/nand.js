var Gate = require("../lib/gate");

var Nand = function() {
  Gate.call(this, ["a", "b"], ["out"]);

  this.evaluate = function() {
    var newValue = 1 - (this.getInputValue("a") & this.getInputValue("b"));
    this.setOutputValue("out", newValue);
  };
};
Nand.prototype = Object.create(Gate.prototype);
Nand.prototype.constructor = Nand;
Gate.classes["Nand"] = Nand;

module.exports = Nand;
