var _ = require("underscore");
var Model = require("../lib/Model");

var Definition = {};

Definition.Chip = function(attributes) {
  this.name = attributes.name;
  this.inputs = attributes.inputs;
  this.outputs = attributes.outputs;
  this.parts = attributes.parts;
  this.builtin = attributes.builtin;
  this.internals = new Definition.Pins({ pins: [] });
};

Definition.Chip.prototype.resolveImplementation = function(resolver) {
  if (this.builtin) {
    this.builtin.resolve(resolver)
  } else {
    this.parts.resolve(resolver, this);
  };
};

Definition.Chip.prototype.buildModel = function() {
  var gate = new Model.Chip({
    name: this.name,
    inputBusses: this.inputs.buildModel(),
    outputBusses: this.outputs.buildModel(),
    internals: this.internals.buildModel()
  });
  if (this.builtin) {
    this.builtin.buildModel(gate);
  } else {
    this.parts.buildModel(gate);
  };
  return gate;
};

Definition.Busses = function(attributes) {
  this.busses = attributes.busses;
};

Definition.Busses.prototype.buildModel = function() {
  var busses = this.busses.map(function(bus) { return bus.buildModel(); });
  return new Model.Busses(busses);
};

Definition.Bus = function(attributes) {
  this.name = attributes.name;
  this.width = attributes.width;
};

Definition.Bus.prototype.buildModel = function() {
  return new Model.Bus({ name: this.name, width: this.width});
};

Definition.Pins = function(attributes) {
  this.pins = attributes.pins;
};

Definition.Pins.prototype.buildModel = function() {
  return new Model.Pins(this.pins.map(function(i) { return new Model.Pin({ name: i }); }));
};

Definition.Parts = function(attributes) {
  this.parts = attributes.parts;
};

Definition.Parts.prototype.resolve = function(resolver, chip) {
  this.parts.forEach(function(p) { p.resolve(resolver, chip); });
};

Definition.Parts.prototype.buildModel = function(gate) {
  this.parts.forEach(function(p) { p.buildModel(gate); });
};

Definition.Part = function(attributes) {
  this.name = attributes.name;
  this.connections = attributes.connections;
  this.definition = attributes.definition;
};

Definition.Part.prototype.resolve = function(resolver, chip) {
  this.definition = resolver.resolvePart(this.name);
  this.connections.forEach(function(c) { c.resolve(chip); });
};

Definition.Part.prototype.buildModel = function(gate) {
  var chip = this.definition.buildModel();
  this.connections.forEach(function(c) { c.connect(gate, chip); });
};

Definition.Connection = function(attributes) {
  this.part = attributes.part;
  this.part_pin = attributes.part_pin;
  this.chip_pin = attributes.chip_pin;
};

Definition.Connection.prototype.resolve = function(chip) {
  var chipPin = this.chip_pin;
  var existingPins = chip.inputs.busses.concat(chip.outputs.busses).map(function(b) { return b.name });
  if (existingPins.concat(chip.internals.pins).indexOf(chipPin) == -1) {
    chip.internals.pins.push(chipPin);
  };
};

Definition.Connection.prototype.connect = function(gate, chip) {
  if (chip.hasInput(this.part_pin)) {
    var pinToRead = gate.getInput(this.chip_pin) || gate.getInternal(this.chip_pin);
    var pinToWrite = chip.getInput(this.part_pin);
  } else if (chip.hasOutput(this.part_pin)) {
    var pinToRead = chip.getOutput(this.part_pin);
    var pinToWrite = gate.getOutput(this.chip_pin) || gate.getInternal(this.chip_pin);
  } else {
    throw "'" + this.part_pin + "' is not a pin in '" + chip.get("name") + "' chip";
  };
  pinToRead.on("change:value", function() {
    pinToWrite.setValue(pinToRead.getValue());
  });
};

Definition.Builtin = function(attributes) {
  this.name = attributes.name;
  this.definition = attributes.definition;
};

Definition.Builtin.prototype.resolve = function(resolver) {
  this.definition = resolver.resolveBuiltin(this.name);
};

Definition.Builtin.prototype.buildModel = function(gate) {
  new this.definition(gate);
};

module.exports = Definition;
