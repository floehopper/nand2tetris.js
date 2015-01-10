var Gate = require("../lib/gate");

require("../lib/not");
require("../lib/and");

var DMux = function() {
  var tree = Gate.parseFile('dmux');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
DMux.prototype = Object.create(Gate.prototype);
DMux.prototype.constructor = DMux;

module.exports = DMux;
