var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/not");

var Not16 = function() {
  HDLGate.call(this, 'not16');
};
Not16.prototype = Object.create(Gate.prototype);
Not16.prototype.constructor = Not16;

module.exports = Not16;
