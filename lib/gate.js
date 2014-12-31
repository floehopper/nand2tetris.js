var Gate = function(inputs, outputs, parts) {
  this.inputs = inputs;
  this.outputs = outputs;
  this.parts = parts;
  this.inputValues = {};
  this.outputValues = {};
  this.internalValues = {};
};

Gate.prototype.hasInput = function hasInput(pin) {
  return this.inputs.indexOf(pin) >= 0;
};

Gate.prototype.hasOutput = function hasOutput(pin) {
  return this.outputs.indexOf(pin) >= 0;
};

Gate.prototype.getInputValue = function(input) {
  return this.inputValues[input];
};

Gate.prototype.setInputValue = function(input, value) {
  this.inputValues[input] = value;
};

Gate.prototype.getInternalValue = function(pin) {
  return this.internalValues[pin];
};

Gate.prototype.setInternalValue = function(pin, value) {
  this.internalValues[pin] = value;
};

Gate.prototype.setOutputValue = function(output, value) {
  this.outputValues[output] = value;
};

Gate.prototype.getOutputValue = function(output) {
  return this.outputValues[output];
};

Gate.prototype.evaluate = function() {
  var gate = this;
  gate.parts.forEach(function(part) {
    chipClass = Gate.classes[part.name]
    if (!chipClass) {
      throw "Unknown chip type";
    }
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

Gate.classes = {};

module.exports = Gate;
