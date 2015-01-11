var Gate = function(inputs, outputs) {
  var inputs = inputs;
  var outputs = outputs;
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
};

Gate.classes = {};

Gate.lookup = function lookup(chipName) {
  var chipClass = Gate.classes[chipName];
  if (!chipClass) {
    try {
      chipClass = require("../lib/" + chipName);
    } catch(exception) {
      if (exception.code != "MODULE_NOT_FOUND") {
        throw exception;
      };
    }
    if (!chipClass) {
      var HDLGate = require("../lib/HDLGate");
      chipClass = function() {
        HDLGate.call(this, chipName);
      };
      chipClass.prototype = Object.create(HDLGate.prototype);
      chipClass.prototype.constructor = chipClass;
    }
  };
  Gate.classes[chipName] = chipClass;
  return chipClass;
}

module.exports = Gate;
