var AST = {};

AST.Chip = function(name, inputs, outputs, parts, builtin) {
  this.name = name;
  this.inputs = inputs;
  this.outputs = outputs;
  this.parts = parts;
  this.builtin = builtin;
};

AST.Inputs = function(pins) {
  this.pins = pins;
};

AST.Outputs = function(pins) {
  this.pins = pins;
};

AST.Parts = function(parts) {
  this.parts = parts;
};

AST.Part = function(name, connections) {
  this.name = name;
  this.connections = connections;
};

AST.Connection = function(part_pin, chip_pin) {
  this.part_pin = part_pin;
  this.chip_pin = chip_pin;
};

AST.Builtin = function(name) {
  this.name = name;
}

module.exports = AST;