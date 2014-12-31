var Gate = require("../lib/gate");

var And = function() {
  Gate.call(this, ["a", "b"], ["out"], [
    {
      name: "Nand",
      connections: [
        { part_pin: "a", chip_pin: "a" },
        { part_pin: "b", chip_pin: "b" },
        { part_pin: "out", chip_pin: "nand" }
      ]
    },
    {
      name: "Not",
      connections: [
        { part_pin: "in", chip_pin: "nand" },
        { part_pin: "out", chip_pin: "out" }
      ]
    }
  ]);
};
And.prototype = Object.create(Gate.prototype);
And.prototype.constructor = And;

module.exports = And;
