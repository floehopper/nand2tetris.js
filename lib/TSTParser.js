var TSTParser = function() {
  var PEG = require("pegjs");
  var fs = require("fs");

  var data = fs.readFileSync([__dirname, "/TST.pegjs"].join("/"));
  return PEG.buildParser(data.toString());
}

module.exports = TSTParser;