var Model = require("../lib/Model");

var Definition = {};

Definition.Chip = function(attributes) {
  this.name = attributes.name;
  this.inputs = attributes.inputs;
  this.outputs = attributes.outputs;
  this.parts = attributes.parts;
  this.builtin = attributes.builtin;
  this.internals = [];
}

Definition.Chip.prototype.resolveImplementation = function(resolver) {
  if (this.builtin) {
    this.builtin.resolve(resolver)
  } else {
    this.parts.resolve(resolver, this);
  };
};

Definition.Chip.prototype.buildModel = function() {
  var gate = new Model.Chip(this.inputs, this.outputs, this.internals);
  if (this.builtin) {
    this.builtin.buildModel(gate);
  } else {
    this.parts.buildModel(gate);
  };
  return gate;
};
  
Definition.Parts = function(attributes) {
  this.parts = attributes.parts;
};

Definition.Parts.prototype.resolve = function(resolver, chip) {
  this.parts.forEach(function(p) { p.resolve(resolver, chip); });
};

Definition.Parts.prototype.buildModel = function(gate) {
  this.parts.forEach(function(p) { p.buildModel(gate); });
}

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
  this.part_pin = attributes.part_pin;
  this.chip_pin = attributes.chip_pin;
};

Definition.Connection.prototype.resolve = function(chip) {
  if (chip.inputs.indexOf(this.chip_pin) == -1) {
    chip.internals.push(this.chip_pin);
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
    throw "'" + this.part_pin + "' is not a pin in " + chip.name;
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
}

module.exports = Definition;
