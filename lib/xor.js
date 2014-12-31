var Gate = require("../lib/gate");

var Xor = function() {
  Gate.call(this, ["a", "b"], ["out"], [
    {
      name: "Not",
      connections: [
        { part_pin: "in", chip_pin: "a" },
        { part_pin: "out", chip_pin: "nota" }
      ]
    },
    {
      name: "Not",
      connections: [
        { part_pin: "in", chip_pin: "b" },
        { part_pin: "out", chip_pin: "notb" }
      ]
    },
    {
      name: "And",
      connections: [
        { part_pin: "a", chip_pin: "a" },
        { part_pin: "b", chip_pin: "notb" },
        { part_pin: "out", chip_pin: "w1" }
      ]
    },
    {
      name: "And",
      connections: [
        { part_pin: "a", chip_pin: "nota" },
        { part_pin: "b", chip_pin: "b" },
        { part_pin: "out", chip_pin: "w2" }
      ]
    },
    {
      name: "Or",
      connections: [
        { part_pin: "a", chip_pin: "w1" },
        { part_pin: "b", chip_pin: "w2" },
        { part_pin: "out", chip_pin: "out" }
      ]
    }
  ]);
};
Xor.prototype = Object.create(Gate.prototype);
Xor.prototype.constructor = Xor;

module.exports = Xor;
