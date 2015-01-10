var Gate = require("../lib/gate");

require("../lib/nand");
require("../lib/not");

var And = function() {
  var tree = Gate.parseFile('and');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
And.prototype = Object.create(Gate.prototype);
And.prototype.constructor = And;
Gate.classes["And"] = And;

module.exports = And;
