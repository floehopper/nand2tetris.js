var Gate = require("../lib/Gate");

var Nand = Gate.extend({
  initialize: function() {
    var that = this;

    this.set("name", "Nand");
    Gate.prototype.initialize.apply(this, [["a", "b"], ["out"]]);

    var evaluate = function() {
      var newValue = 1 - (that.getInputValue("a") & that.getInputValue("b"));
      that.setOutputValue("out", newValue);
    }

    this.getInput("a").on("change:value", function() {
      evaluate();
    });

    this.getInput("b").on("change:value", function() {
      evaluate();
    });
  }
});

module.exports = Nand;
