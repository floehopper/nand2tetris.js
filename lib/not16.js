var Gate = require("../lib/gate");

require("../lib/not");

var Not16 = function() {
  var tree = Gate.parseFile('not16');
  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Not16.prototype = Object.create(Gate.prototype);
Not16.prototype.constructor = Not16;

module.exports = Not16;
