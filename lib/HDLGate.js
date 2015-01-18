var Gate = require("../lib/Gate");

var HDLGate = Gate.extend({
  initialize: function(chipClass) {
    this.set("name", chipClass);
    var gate = this;
    var fs = require("fs");
    var hdl = fs.readFileSync([__dirname, chipClass + ".hdl"].join("/"));
    var HDLParser = require("../lib/HDLParser");
    var parser = new HDLParser();
    var tree = parser.parse(hdl.toString());
    var parts = tree.parts;

    Gate.prototype.initialize.apply(this, [tree.inputs, tree.outputs]);

    parts.forEach(function(part) {
      chipClass = Gate.lookup(part.name);
      var chip = new chipClass();
      part.connections.forEach(function(connection) {
        if (chip.hasInput(connection.part_pin)) {
          if (gate.hasInput(connection.chip_pin)) {
            gate.getInput(connection.chip_pin).on("change:value", function() {
              chip.setInputValue(connection.part_pin, gate.getInputValue(connection.chip_pin));
            });
          } else {
            gate.getInternal(connection.chip_pin).on("change:value", function() {
              chip.setInputValue(connection.part_pin, gate.getInternalValue(connection.chip_pin));
            });
          };
        } else if (chip.hasOutput(connection.part_pin)) {
          if (gate.hasOutput(connection.chip_pin)) {
            chip.getOutput(connection.part_pin).on("change:value", function() {
              gate.setOutputValue(connection.chip_pin, chip.getOutputValue(connection.part_pin));
            });
          } else {
            chip.getOutput(connection.part_pin).on("change:value", function() {
              gate.setInternalValue(connection.chip_pin, chip.getOutputValue(connection.part_pin));
            });
          };
        } else {
          throw "'" + connection.part_pin + "' is not a pin in " + part.name;
        };
      });
    });
  }
});

module.exports = HDLGate;
