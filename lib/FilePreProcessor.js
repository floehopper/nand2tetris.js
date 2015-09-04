var fs = require("fs");
var stripComments = require('strip-comments');

FilePreProcessor = function(path) {
  this.path = path;

  this.toString = function() {
    var file = fs.readFileSync(path);
    var string = file.toString();
    var stringWithoutComments = stripComments(string);
    var stringWithoutBlankLines = stringWithoutComments.replace(/(\r|\n|\r\n)/gm,"");
    return stringWithoutBlankLines;
  }
};

module.exports = FilePreProcessor;
