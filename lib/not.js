var Gate = require("../lib/gate");

require("../lib/nand");

var Not = function() {
  var tree = Gate.parseFile('not');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Not.prototype = Object.create(Gate.prototype);
Not.prototype.constructor = Not;
Gate.classes["Not"] = Not;

module.exports = Not;
