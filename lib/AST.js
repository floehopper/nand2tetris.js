var AST = {};

AST.Chip = function(name, inputs, outputs, parts) {
  this.name = name;
  this.inputs = inputs;
  this.outputs = outputs;
  this.parts = parts;
};

module.exports = AST;