var Nand = function(gate) {
  var evaluate = function() {
    var newValue = 1 - (gate.getInputValue("a") & gate.getInputValue("b"));
    gate.setOutputValue("out", newValue);
  };

  gate.get("inputs").on("change:value", function() {
    evaluate();
  });
};

module.exports = Nand;
