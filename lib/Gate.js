var Pin = require("../lib/Pin");

var Gate = function(inputs, outputs) {
  var inputs = inputs.reduce(function(o, v) { o[v] = new Pin(); return o; }, {});
  var outputs = outputs.reduce(function(o, v) { o[v] = new Pin(); return o; }, {});
  var internals = {};

  this.hasInput = function hasInput(pin) {
    return (inputs[pin] !== undefined);
  };

  this.hasOutput = function hasOutput(pin) {
    return (outputs[pin] !== undefined);
  };

  this.getInputValue = function(pin) {
    return inputs[pin].getValue();
  };

  this.setInputValue = function(pin, value) {
    inputs[pin].setValue(value);
  };

  this.getInternalValue = function(pin) {
    return internals[pin].getValue();
  };

  this.setInternalValue = function(pin, value) {
    internals[pin] = new Pin();
    internals[pin].setValue(value);
  };

  this.setOutputValue = function(pin, value) {
    outputs[pin].setValue(value);
  };

  this.getOutputValue = function(pin) {
    return outputs[pin].getValue();
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
