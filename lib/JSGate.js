var Gate = require("../lib/gate");

var JSGate = function(inputs, outputs, implementation) {
  Gate.call(this, inputs, outputs);
  this.evaluate = implementation;
};
JSGate.prototype = Object.create(Gate.prototype);
JSGate.prototype.constructor = JSGate;

module.exports = JSGate;
