var Gate = require("../lib/gate");

var Mux = function() {
  Gate.call(this, ["a", "b", "sel"], ["out"], [
    {
      name: "Not",
      connections: [
        { part_pin: "in", chip_pin: "sel" },
        { part_pin: "out", chip_pin: "notsel" }
      ]
    },
    {
      name: "And",
      connections: [
        { part_pin: "a", chip_pin: "a" },
        { part_pin: "b", chip_pin: "notsel" },
        { part_pin: "out", chip_pin: "aout" }
      ]
    },
    {
      name: "And",
      connections: [
        { part_pin: "a", chip_pin: "b" },
        { part_pin: "b", chip_pin: "sel" },
        { part_pin: "out", chip_pin: "bout" }
      ]
    },
    {
      name: "Or",
      connections: [
        { part_pin: "a", chip_pin: "aout" },
        { part_pin: "b", chip_pin: "bout" },
        { part_pin: "out", chip_pin: "out" }
      ]
    }
  ]);
};
Mux.prototype = Object.create(Gate.prototype);
Mux.prototype.constructor = Mux;

module.exports = Mux;
