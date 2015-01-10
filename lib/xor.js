var Gate = require("../lib/gate");

require("../lib/not");
require("../lib/and");
require("../lib/or");

var Xor = function() {
  var tree = Gate.parseFile('xor');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Xor.prototype = Object.create(Gate.prototype);
Xor.prototype.constructor = Xor;

module.exports = Xor;
