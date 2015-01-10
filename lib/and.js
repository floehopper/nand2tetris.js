var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/nand");
require("../lib/not");

var And = function() {
  HDLGate.call(this, 'and');
};
And.prototype = Object.create(Gate.prototype);
And.prototype.constructor = And;

module.exports = And;
