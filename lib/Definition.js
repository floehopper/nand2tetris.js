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
    var impl = new this.builtin.definition(gate);
  } else {
    this.parts.parts.forEach(function(part) {
      var chip = part.definition.buildModel();
      part.connections.forEach(function(connection) {
        if (chip.hasInput(connection.part_pin)) {
          var pinToRead = gate.getInput(connection.chip_pin) || gate.getInternal(connection.chip_pin);
          var pinToWrite = chip.getInput(connection.part_pin);
        } else if (chip.hasOutput(connection.part_pin)) {
          var pinToRead = chip.getOutput(connection.part_pin);
          var pinToWrite = gate.getOutput(connection.chip_pin) || gate.getInternal(connection.chip_pin);
        } else {
          throw "'" + connection.part_pin + "' is not a pin in " + part.name;
        };
        pinToRead.on("change:value", function() {
          pinToWrite.setValue(pinToRead.getValue());
        });
      });
    });
  };
  return gate;
};
  
Definition.Parts = function(attributes) {
  this.parts = attributes.parts;
};

Definition.Parts.prototype.resolve = function(resolver, chip) {
  this.parts.forEach(function(p) { p.resolve(resolver, chip); });
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

Definition.Connection = function(attributes) {
  this.part_pin = attributes.part_pin;
  this.chip_pin = attributes.chip_pin;
};

Definition.Connection.prototype.resolve = function(chip) {
  if (chip.inputs.indexOf(this.chip_pin) == -1) {
    chip.internals.push(this.chip_pin);
  };
};

Definition.Builtin = function(attributes) {
  this.name = attributes.name;
  this.definition = attributes.definition;
};

Definition.Builtin.prototype.resolve = function(resolver) {
  this.definition = resolver.resolveBuiltin(this.name);
};

module.exports = Definition;
