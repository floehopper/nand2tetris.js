var Gate = require("../lib/Gate");

var Nand = function() {
  var that = this;
  Gate.call(this, ["a", "b"], ["out"]);

  var evaluate = function() {
    var newValue = 1 - (that.getInputValue("a") & that.getInputValue("b"));
    that.setOutputValue("out", newValue);
  };

  this.getInput("a").on("change:value", function() {
    evaluate();
  });

  this.getInput("b").on("change:value", function() {
    evaluate();
  });
};
Nand.prototype = Object.create(Gate.prototype);
Nand.prototype.constructor = Nand;

module.exports = Nand;
