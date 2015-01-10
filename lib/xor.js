var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/not");
require("../lib/and");
require("../lib/or");

var Xor = function() {
  HDLGate.call(this, 'xor');
};
Xor.prototype = Object.create(Gate.prototype);
Xor.prototype.constructor = Xor;

module.exports = Xor;
