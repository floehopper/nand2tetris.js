var Gate = require("../lib/gate");

var Or = function() {
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
      name: "Nand",
      connections: [
        { part_pin: "a", chip_pin: "nota" },
        { part_pin: "b", chip_pin: "notb" },
        { part_pin: "out", chip_pin: "out" }
      ]
    },
  ]);
};
Or.prototype = Object.create(Gate.prototype);
Or.prototype.constructor = Or;
Gate.classes["Or"] = Or;

module.exports = Or;
