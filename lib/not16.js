var Gate = require("../lib/gate");

var Not16 = function() {
  var inputs = [];
  var outputs = [];
  var parts = [];
  for (var index = 0; index < 16; index++) {
    inputs.push("in[" + index + "]");
    outputs.push("out[" + index + "]");
    parts.push({
      name: "Not",
      connections: [
        { part_pin: "in", chip_pin: "in[" + index + "]" },
        { part_pin: "out", chip_pin: "out[" + index + "]" }
      ]
    });
  };

  Gate.call(this, inputs, outputs, parts);
};
Not16.prototype = Object.create(Gate.prototype);
Not16.prototype.constructor = Not16;

module.exports = Not16;
