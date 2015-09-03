var path = require("path");
var fs = require("fs");
var sprintf = require("underscore.string/sprintf");

var TSTParser = require("../lib/TSTParser");
var Resolver = require("../lib/Resolver");
var LineIterator = require("../lib/LineIterator");

var HardwareSimulator = function() {
  this.parser = new TSTParser();

  this.run = function(testFilePath) {
    var testDirectory = path.dirname(testFilePath);
    var testFile = fs.readFileSync(testFilePath);

    var ast = this.parser.parse(testFile.toString());

    var config = setup(ast, testDirectory);
    simulate(ast, config);
  };

  var setup = function(ast, testDirectory) {
    var chip;
    var outputFilePath;
    var comparisonFilePath;
    var variables;

    var resolver = new Resolver();

    ast.setup_step.forEach(function(command) {
      switch(command.command) {
        case "load":
          var basename = command.filename.slice(0, -4);
          var definition = resolver.resolvePart(basename);
          chip = definition.buildModel();
          break;
        case "output-file":
          outputFilePath = path.join(testDirectory, command.filename);
          break;
        case "compare-to":
          comparisonFilePath = path.join(testDirectory, command.filename);
          break;
        case "output-list":
          variables = command.variables;
          var headers = variables.map(function(v) {
            var width = v.left_padding + v.width + v.right_padding;
            var name = v.name.substr(0, width);
            var leftSpace = Math.floor((width - name.length) / 2);
            var rightSpace = width - leftSpace - name.length;
            var leftPadding = sprintf("%" + leftSpace + "s", "");
            var rightPadding = sprintf("%" + rightSpace + "s", "");
            return leftPadding + name + rightPadding;
          });
          headers.unshift(""); // add initial pipe separator
          headers.push(""); // add final pipe separator
          fs.writeFileSync(outputFilePath, headers.join("|") + "\n");
          break;
        default:
          throw "Unknown command: " + command.command;
      };
    });
    return { chip: chip, outputFilePath: outputFilePath, comparisonFilePath: comparisonFilePath, variables: variables };
  };

  var simulate = function(ast, config) {
    var comparisonLines = new LineIterator(fs.readFileSync(config.comparisonFilePath).toString());
    var ignoredHeaders = comparisonLines.next();

    ast.simulation_steps.forEach(function(step) {
      step.forEach(function(command) {
        switch(command.command) {
          case "set":
            config.chip.setInputValue(command.variable, command.value);
            break;
          case "eval":
            // no op
            break;
          case "output":
            var columns = config.variables.map(function(v) {
              var value = config.chip.getValue(v.name);
              var leftPadding = sprintf("%" + v.left_padding + "s", "");
              var rightPadding = sprintf("%" + v.right_padding + "s", "");
              return leftPadding + value + rightPadding;
            });
            columns.unshift(""); // add initial pipe separator
            columns.push(""); // add final pipe separator
            var outputLine = columns.join("|");
            fs.appendFileSync(config.outputFilePath, outputLine + "\n");

            var comparisonLine = comparisonLines.next();
            if (comparisonLine.done) {
              throw "No more lines to compare";
            } else {
              if (outputLine != comparisonLine.line) {
                throw "Comparison failure at line " + comparisonLine.lineNumber;
              }
            };
            break;
          default:
            throw "Unknown command: " + command.command;
        };
      });
    });

    console.log("End of script - Comparison ended successfully");
    return;
  };
  return;
};

module.exports = HardwareSimulator;
