var Nand = function() {
  this.evaluate = function(gate) {
    var newValue = 1 - (gate.getInputValue("a") & gate.getInputValue("b"));
    gate.setOutputValue("out", newValue);
  }
};

module.exports = Nand;
