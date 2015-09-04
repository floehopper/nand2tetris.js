var path = require("path");
var fs = require("fs");
var sprintf = require("underscore.string/sprintf");

var TSTParser = require("../lib/TSTParser");
var Resolver = require("../lib/Resolver");
var LineIterator = require("../lib/LineIterator");
var FilePreProcessor = require("../lib/FilePreProcessor");

var HardwareSimulator = function() {
  this.parser = new TSTParser();

  this.run = function(testFilePath) {
    var testDirectory = path.dirname(testFilePath);
    var testScript = new FilePreProcessor(testFilePath).toString();
    var ast = this.parser.parse(testScript);
    var result = setup(ast.setup_step, testDirectory);
    simulate(ast.simulation_steps, result.chip, result.config);
  };

  var setup = function(setupStep, testDirectory) {
    var chip;
    var config = {};
    var resolver = new Resolver(testDirectory);

    setupStep.forEach(function(command) {
      switch(command.command) {
        case "load":
          var basename = command.filename.slice(0, -4);
          var definition = resolver.resolvePart(basename);
          chip = definition.buildModel();
          break;
        case "output-file":
          config.outputFilePath = path.join(testDirectory, command.filename);
          break;
        case "compare-to":
          config.comparisonFilePath = path.join(testDirectory, command.filename);
          break;
        case "output-list":
          config.variables = command.variables;
          var headers = config.variables.map(function(v) {
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
          var headersLine = headers.join("|");
          fs.writeFileSync(config.outputFilePath, headersLine + "\n");
          console.log(headersLine);
          break;
        default:
          throw "Unknown command: " + command.command;
      };
    });
    return { chip: chip, config: config };
  };

  var simulate = function(simulationSteps, chip, config) {
    var comparisonLines = new LineIterator(fs.readFileSync(config.comparisonFilePath).toString());
    var ignoredHeaders = comparisonLines.next();

    simulationSteps.forEach(function(step) {
      step.forEach(function(command) {
        switch(command.command) {
          case "set":
            chip.setInputValue(command.variable, command.value);
            break;
          case "eval":
            // no op
            break;
          case "output":
            var columns = config.variables.map(function(v) {
              var value = chip.getValue(v.name);
              var leftPadding = sprintf("%" + v.left_padding + "s", "");
              var rightPadding = sprintf("%" + v.right_padding + "s", "");
              return leftPadding + value + rightPadding;
            });
            columns.unshift(""); // add initial pipe separator
            columns.push(""); // add final pipe separator
            var outputLine = columns.join("|");
            fs.appendFileSync(config.outputFilePath, outputLine + "\n");
            console.log(outputLine);

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
