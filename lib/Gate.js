var Backbone = require("backbone");
var Pin = require("../lib/Pin");

var Pins = Backbone.Collection.extend({
  model: Pin
});

var Gate = Backbone.Model.extend({
  initialize: function(inputs, outputs) {
    this.set("inputs", new Pins(inputs.map(function(i) { return new Pin({ name: i }); })));
    this.set("outputs", new Pins(outputs.map(function(o) { return new Pin({ name: o }); })));
    this.set("internals", new Pins([]));
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
    if (this.get("internals").where({ name: pin })[0] === undefined) {
      this.get("internals").push(new Pin({ name: pin }));
    };
    return this.get("internals").where({ name: pin })[0];
  }
}, {
  lookup: function(chipName) {
    var chipClass = Gate.classes[chipName];
    if (!chipClass) {
      var HDLGate = require("../lib/HDLGate");
      chipClass = HDLGate.extend({
        initialize: function() {
          HDLGate.prototype.initialize.apply(this, [chipName]);
        }
      });
    };
    Gate.classes[chipName] = chipClass;
    return chipClass;
  }
});

Gate.classes = {};

module.exports = Gate;
