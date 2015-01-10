var Gate = require("../lib/gate");

require("../lib/nand");

var Not = function() {
  var fs = require("fs");
  var hdl = fs.readFileSync([__dirname, "not.hdl"].join("/"));
  var HDLParser = require("../lib/HDLParser");
  var parser = new HDLParser();
  var tree = parser.parse(hdl.toString());

  Gate.call(this, tree.inputs, tree.outputs, tree.parts);
};
Not.prototype = Object.create(Gate.prototype);
Not.prototype.constructor = Not;
Gate.classes["Not"] = Not;

module.exports = Not;
