var Gate = require("../lib/Gate");

var JSGate = function(inputs, outputs) {
  Gate.call(this, inputs, outputs);
};
JSGate.prototype = Object.create(Gate.prototype);
JSGate.prototype.constructor = JSGate;

module.exports = JSGate;
