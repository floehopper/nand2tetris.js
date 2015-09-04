var Backbone = require("backbone");
var _ = require("underscore");
var sprintf = require("underscore.string/sprintf");

var Model = {};

Model.Bus = Backbone.Model.extend({
  initialize: function() {
    var width = this.get("width");
    var name = this.get("name");
    var pinNames = width ? _.range(width).map(function(i) { return name + "[" + i + "]"; }) : [name];
    this.set("pins", new Model.Pins(pinNames.map(function(name, index) { return new Model.Pin({ name: name, index: index }); })));
  },

  setValue: function(newValue) {
    var width = this.get("width");
    var format = "%0" + width + "b"
    var bitValues = sprintf(format, newValue).split("").map(function(v) { return parseInt(v) });
    this.get("pins").each(function(pin) { pin.setValue(bitValues[pin.get("index")]); });
  },

  getValue: function() {
    var width = this.get("width");
    var bitValues = new Array(width);
    this.get("pins").each(function(pin) { bitValues[pin.get("index")] = pin.getValue() });
    return parseInt(bitValues.join(""), 2);
  }
});

Model.Busses = Backbone.Collection.extend({
  model: Model.Bus
});

Model.Pin = Backbone.Model.extend({
  getValue: function() {
    return this.get("value");
  },

  setValue: function(newValue) {
    this.set("value", newValue);
  }
});

Model.Pins = Backbone.Collection.extend({
  model: Model.Pin
});

Model.Chip = Backbone.Model.extend({
  initialize: function(attributes) {
    var inputs = new Model.Pins([]);
    this.get("inputBusses").each(function(bus) { inputs.add(bus.get("pins").models); });
    this.set("inputs", inputs);

    var outputs = new Model.Pins([]);
    this.get("outputBusses").each(function(bus) { outputs.add(bus.get("pins").models); });
    this.set("outputs", outputs);
  },
  
  hasInput: function(pin) {
    return (this.getInput(pin) !== undefined);
  },

  hasOutput: function(pin) {
    return (this.getOutput(pin) !== undefined);
  },

  getInputValue: function(pin) {
    return this.getInput(pin).getValue();
  },

  setInputValue: function(pin, value) {
    this.getInput(pin).setValue(value);
  },

  getInternalValue: function(pin) {
    return this.getInternal(pin).getValue();
  },

  setInternalValue: function(pin, value) {
    this.getInternal(pin).setValue(value);
  },

  setOutputValue: function(pin, value) {
    this.getOutput(pin).setValue(value);
  },

  getOutputValue: function(pin) {
    return this.getOutput(pin).getValue();
  },

  getInput: function(pin) {
    return this.get("inputs").where({ name: pin })[0];
  },

  getOutput: function(pin) {
    return this.get("outputs").where({ name: pin })[0];
  },

  getInternal: function(pin) {
    return this.get("internals").where({ name: pin })[0];
  },

  getValue: function(name) {
    // return (this.getInput(pin) || this.getInternal(pin) || this.getOutput(pin)).getValue();
    return (this.getInputBus(name) || this.getOutputBus(name)).getValue();
  },

  getInputBus: function(name) {
    return this.get("inputBusses").where({ name: name })[0];
  },

  getOutputBus: function(name) {
    return this.get("outputBusses").where({ name: name })[0];
  },

  setValue: function(name, newValue) {
    this.getInputBus(name).setValue(newValue);
  }
});

module.exports = Model;