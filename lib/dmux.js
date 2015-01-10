var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/not");
require("../lib/and");

var DMux = function() {
  HDLGate.call(this, 'dmux');
};
DMux.prototype = Object.create(Gate.prototype);
DMux.prototype.constructor = DMux;

module.exports = DMux;
