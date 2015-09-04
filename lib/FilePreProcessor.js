var fs = require("fs");

FilePreProcessor = function(path) {
  this.path = path;

  this.toString = function() {
    var file = fs.readFileSync(path);
    var string = file.toString();
    var stringWithoutComments = string.replace(/^\/\/.*$/gm, "");
    var stringWithoutBlankLines = stringWithoutComments.replace(/(\r|\n|\r\n)/gm,"");
    return stringWithoutBlankLines;
  }
};

module.exports = FilePreProcessor;
