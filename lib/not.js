var Gate = require("../lib/gate");
var HDLGate = require("../lib/HDLGate");

require("../lib/nand");

var Not = function() {
  HDLGate.call(this, 'not');
};
Not.prototype = Object.create(HDLGate.prototype);
Not.prototype.constructor = Not;

module.exports = Not;
