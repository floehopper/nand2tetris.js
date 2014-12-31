var Gate = require("../lib/gate");

var DMux = function() {
  Gate.call(this, ["in", "sel"], ["a", "b"], [
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
        { part_pin: "a", chip_pin: "in" },
        { part_pin: "b", chip_pin: "notsel" },
        { part_pin: "out", chip_pin: "a" }
      ]
    },
    {
      name: "And",
      connections: [
        { part_pin: "a", chip_pin: "in" },
        { part_pin: "b", chip_pin: "sel" },
        { part_pin: "out", chip_pin: "b" }
      ]
    }
  ]);
};
DMux.prototype = Object.create(Gate.prototype);
DMux.prototype.constructor = DMux;

module.exports = DMux;
