module.exports = function() {
  var PEG = require("pegjs");
  var fs = require("fs");

  var data = fs.readFileSync([__dirname, "/hdl.pegjs"].join("/"));
  return PEG.buildParser(data.toString());
}
