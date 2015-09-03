#!/usr/bin/env node

var testFilePath = process.argv[2];

var path = require("path");
var fs = require("fs");
var sprintf = require("underscore.string/sprintf");

var TSTParser = require("../lib/TSTParser");
var Resolver = require("../lib/Resolver");
var LineIterator = require("../lib/LineIterator");

var HardwareSimulator = function(testFilePath) {
  var testDirectory = path.dirname(testFilePath);
  var testFile = fs.readFileSync(testFilePath);

  var parser = new TSTParser();
  var ast = parser.parse(testFile.toString());
  var resolver = new Resolver();

  var chip;
  var outputFilePath;
  var comparisonFilePath;
  var variables;

  var setup = function() {
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
    return;
  };

  var run = function() {
    var comparisonLines = new LineIterator(fs.readFileSync(comparisonFilePath).toString());
    var ignoredHeaders = comparisonLines.next();

    ast.simulation_steps.forEach(function(step) {
      step.forEach(function(command) {
        switch(command.command) {
          case "set":
            chip.setInputValue(command.variable, command.value);
            break;
          case "eval":
            // no op
            break;
          case "output":
            var columns = variables.map(function(v) {
              var value = chip.getValue(v.name);
              var leftPadding = sprintf("%" + v.left_padding + "s", "");
              var rightPadding = sprintf("%" + v.right_padding + "s", "");
              return leftPadding + value + rightPadding;
            });
            columns.unshift(""); // add initial pipe separator
            columns.push(""); // add final pipe separator
            var outputLine = columns.join("|");
            fs.appendFileSync(outputFilePath, outputLine + "\n");

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
  
  return { setup: setup, run: run };
};

var simulator = new HardwareSimulator(testFilePath);
simulator.setup();
simulator.run();
