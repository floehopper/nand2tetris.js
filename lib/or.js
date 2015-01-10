var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/not");
require("../lib/nand");

var Or = function() {
  HDLGate.call(this, 'or');
};
Or.prototype = Object.create(Gate.prototype);
Or.prototype.constructor = Or;
Gate.classes["Or"] = Or;

module.exports = Or;
