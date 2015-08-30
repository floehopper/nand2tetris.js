var AST = {};

AST.Chip = function(name, inputs, outputs, parts) {
  this.name = name;
  this.inputs = inputs;
  this.outputs = outputs;
  this.parts = parts;
};

AST.Inputs = function(pins) {
  this.pins = pins;
};

AST.Outputs = function(pins) {
  this.pins = pins;
};

module.exports = AST;