var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/not");
require("../lib/and");
require("../lib/or");

var Mux = function() {
  HDLGate.call(this, 'mux');
};
Mux.prototype = Object.create(Gate.prototype);
Mux.prototype.constructor = Mux;

module.exports = Mux;
