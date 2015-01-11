var Backbone = require("backbone");

var Pin = Backbone.Model.extend({
  getValue: function() {
    return this.get("value");
  },

  setValue: function(newValue) {
    this.set("value", newValue);
  }
});

module.exports = Pin;
