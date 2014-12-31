var Gate = function(inputs, outputs) {
  this.inputs = inputs;
  this.outputs = outputs;
  this.inputValues = {};
  this.outputValues = {};
};

Gate.prototype.getInputValue = function(input) {
  return this.inputValues[input];
};

Gate.prototype.setInputValue = function(input, value) {
  this.inputValues[input] = value;
};

Gate.prototype.setOutputValue = function(output, value) {
  this.outputValues[output] = value;
};

Gate.prototype.getOutputValue = function(output) {
  return this.outputValues[output];
};

module.exports = Gate;
