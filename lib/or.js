var Gate = require("../lib/gate");

require("../lib/not");
require("../lib/nand");

var Or = function() {
  var tree = Gate.parseFile('or');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Or.prototype = Object.create(Gate.prototype);
Or.prototype.constructor = Or;
Gate.classes["Or"] = Or;

module.exports = Or;
