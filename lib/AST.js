var _ = require("underscore");
var Definition = require("../lib/Definition");

var AST = {};

AST.Chip = function(attributes) {
  this.name = attributes.name;
  this.inputs = attributes.inputs;
  this.outputs = attributes.outputs;
  this.parts = attributes.parts;
  this.builtin = attributes.builtin;
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

AST.Busses = function(attributes) {
  this.busses = attributes.busses;
};

AST.Busses.prototype.toDefinition = function() {
  var pins = this.busses.reduce(function(arr, bus) { return arr.concat(bus.toDefinition()); }, []);
  return new Definition.Pins({ pins: pins });
};

AST.Bus = function(attributes) {
  this.name = attributes.name;
  this.width = attributes.width;
}

AST.Bus.prototype.toDefinition = function() {
  var name = this.name;
  return this.width ? _.range(this.width).map(function(i) { return name + "[" + i + "]"; }) : [name];
};

AST.Parts = function(attributes) {
  this.parts = attributes.parts;
};

AST.Parts.prototype.toDefinition = function() {
  return new Definition.Parts({
    parts: this.parts.map(function(p) { return p.toDefinition(); })
  });
};

AST.Part = function(attributes) {
  this.name = attributes.name;
  this.connections = attributes.connections;
};

AST.Part.prototype.toDefinition = function() {
  return new Definition.Part({
    name: this.name,
    connections: this.connections.map(function(c) { return c.toDefinition(); })
  });
};

AST.Connection = function(attributes) {
  this.part_pin = attributes.part_pin;
  this.chip_pin = attributes.chip_pin;
};

AST.Connection.prototype.toDefinition = function() {
  return new Definition.Connection({
    part_pin: this.part_pin,
    chip_pin: this.chip_pin
  });
};

AST.Builtin = function(attributes) {
  this.name = attributes.name;
};

AST.Builtin.prototype.toDefinition = function() {
  return new Definition.Builtin({name: this.name});
};

module.exports = AST;