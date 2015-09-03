var LineIterator = function(string) {
  var lineNumber = 0;
  var lines = string.split(/\r|\n|\r\n/);
  return {
    next: function() {
      if (lineNumber < lines.length) {
        return { line: lines[lineNumber++], lineNumber: lineNumber, done: false };
      } else {
        return { done: true };
      };
    }
  };
};

module.exports = LineIterator;
