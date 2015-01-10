var Gate = function(inputs, outputs, parts) {
  var gate = this;
  var inputs = inputs;
  var outputs = outputs;
  var parts = parts;
  var inputValues = {};
  var outputValues = {};
  var internalValues = {};

  this.hasInput = function hasInput(pin) {
    return inputs.indexOf(pin) >= 0;
  };

  this.hasOutput = function hasOutput(pin) {
    return outputs.indexOf(pin) >= 0;
  };

  this.getInputValue = function(input) {
    return inputValues[input];
  };

  this.setInputValue = function(input, value) {
    inputValues[input] = value;
  };

  this.getInternalValue = function(pin) {
    return internalValues[pin];
  };

  this.setInternalValue = function(pin, value) {
    internalValues[pin] = value;
  };

  this.setOutputValue = function(output, value) {
    outputValues[output] = value;
  };

  this.getOutputValue = function(output) {
    return outputValues[output];
  };

  this.evaluate = function() {
    parts.forEach(function(part) {
      chipClass = Gate.classes[part.name]
      if (!chipClass) {
        throw "Unknown chip type: " + part.name;
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
};

Gate.classes = {};

module.exports = Gate;
