var stripComments = require('strip-comments');

stripCommentsAndBlankLines = function(string) {
  return stripComments(string).replace(/(\r|\n|\r\n)/gm,"");
};

module.exports = stripCommentsAndBlankLines;
