var Definition = require("../lib/Definition");

var AST = {};

AST.Chip = function(name, inputs, outputs, parts, builtin) {
  this.name = name;
  this.inputs = inputs;
  this.outputs = outputs;
  this.parts = parts;
  this.builtin = builtin;
};

AST.Chip.prototype.toDefinition = function() {
  return new Definition.Chip({
    name: this.name,
    inputs: this.inputs.toDefinition(),
    outputs: this.outputs.toDefinition(),
    parts: this.parts ? this.parts.toDefinition() : null,
    builtin: this.builtin ? this.builtin.toDefinition() : null
  });
}

AST.Inputs = function(pins) {
  this.pins = pins;
};

AST.Inputs.prototype.toDefinition = function() {
  return this.pins;
};

AST.Outputs = function(pins) {
  this.pins = pins;
};

AST.Outputs.prototype.toDefinition = function() {
  return this.pins;
};

AST.Parts = function(parts) {
  this.parts = parts;
};

AST.Parts.prototype.toDefinition = function() {
  return new Definition.Parts({
    parts: this.parts.map(function(p) { return p.toDefinition(); })
  });
};

AST.Part = function(name, connections) {
  this.name = name;
  this.connections = connections;
};

AST.Part.prototype.toDefinition = function() {
  return new Definition.Part({
    name: this.name,
    connections: this.connections.map(function(c) { return c.toDefinition(); })
  });
};

AST.Connection = function(part_pin, chip_pin) {
  this.part_pin = part_pin;
  this.chip_pin = chip_pin;
};

AST.Connection.prototype.toDefinition = function() {
  return new Definition.Connection({
    part_pin: this.part_pin,
    chip_pin: this.chip_pin
  });
};

AST.Builtin = function(name) {
  this.name = name;
};

AST.Builtin.prototype.toDefinition = function() {
  return new Definition.Builtin({name: this.name});
};

module.exports = AST;