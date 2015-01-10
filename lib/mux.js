var Gate = require("../lib/gate");

require("../lib/not");
require("../lib/and");
require("../lib/or");

var Mux = function() {
  var tree = Gate.parseFile('mux');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Mux.prototype = Object.create(Gate.prototype);
Mux.prototype.constructor = Mux;

module.exports = Mux;
