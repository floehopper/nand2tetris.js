var Backbone = require("backbone");

var Model = {};

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
  initialize: function(inputs, outputs, internals) {
    this.set("inputs", new Model.Pins(inputs.map(function(i) { return new Model.Pin({ name: i }); })));
    this.set("outputs", new Model.Pins(outputs.map(function(o) { return new Model.Pin({ name: o }); })));
    this.set("internals", new Model.Pins(internals.map(function(o) { return new Model.Pin({ name: o }); })));
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
  }
});

module.exports = Model;