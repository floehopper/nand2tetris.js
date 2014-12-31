var Gate = require("../lib/gate");

var Not = function() {
  Gate.call(this, ["in"], ["out"], [
    {
      name: "Nand",
      connections: [
        { part_pin: "a", chip_pin: "in" },
        { part_pin: "b", chip_pin: "in" },
        { part_pin: "out", chip_pin: "out" }
      ]
    }
  ]);
};
Not.prototype = Object.create(Gate.prototype);
Not.prototype.constructor = Not;
Gate.classes["Not"] = Not;

module.exports = Not;
