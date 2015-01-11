module.exports = function() {
  var PEG = require("pegjs");
  var fs = require("fs");

  var data = fs.readFileSync([__dirname, "/HDL.pegjs"].join("/"));
  return PEG.buildParser(data.toString());
}
