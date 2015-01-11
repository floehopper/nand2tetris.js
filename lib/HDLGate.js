var Gate = require("../lib/Gate");

var HDLGate = function(chipClass) {
  var gate = this;
  var fs = require("fs");
  var hdl = fs.readFileSync([__dirname, chipClass + ".hdl"].join("/"));
  var HDLParser = require("../lib/HDLParser");
  var parser = new HDLParser();
  var tree = parser.parse(hdl.toString());
  var parts = tree.parts;

  Gate.call(this, tree.inputs, tree.outputs);

  this.evaluate = function() {
    parts.forEach(function(part) {
      chipClass = Gate.lookup(part.name);
      var chip = new chipClass();
      part.connections.forEach(function(connection) {
        if (chip.hasInput(connection.part_pin)) {
          if (gate.hasInput(connection.chip_pin)) {
            chip.setInputValue(connection.part_pin, gate.getInputValue(connection.chip_pin));
          } else {
            chip.setInputValue(connection.part_pin, gate.getInternalValue(connection.chip_pin));
          };
        } else if (chip.hasOutput(connection.part_pin)) {
          chip.evaluate();
          if (gate.hasOutput(connection.chip_pin)) {
            gate.setOutputValue(connection.chip_pin, chip.getOutputValue(connection.part_pin));
          } else {
            gate.setInternalValue(connection.chip_pin, chip.getOutputValue(connection.part_pin));
          };
        } else {
          throw "'" + connection.part_pin + "' is not a pin in " + part.name;
        };
      });
    });
  };
};

HDLGate.prototype = Object.create(Gate.prototype);
HDLGate.prototype.constructor = HDLGate;

module.exports = HDLGate;
