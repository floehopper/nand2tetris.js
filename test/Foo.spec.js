var chai = require("chai");
var expect = chai.expect;

var fs = require("fs");
var HDLParser = require("../lib/HDLParser");
var parser = new HDLParser();
var AST = require("../lib/AST");

var Resolver = function() {
};

var resolver = new Resolver();

Resolver.prototype.resolvePart = function(name) {
  var hdl = fs.readFileSync([__dirname, "..", "lib", name + ".hdl"].join("/"));
  var ast = parser.parse(hdl.toString(), { AST: AST });
  var definition = ast.toDefinition();
  definition.resolveImplementation(resolver);
  return definition;
}

Resolver.prototype.resolveBuiltin = function(name) {
  try {
    definition = require("../lib/" + name);
  } catch(exception) {
    if (exception.code != "MODULE_NOT_FOUND") {
      throw exception;
    };
  };
  return definition;
}

describe("And", function() {
  var and;

  beforeEach(function() {
    var definition = resolver.resolvePart("And");
    and = definition.buildModel();
  });

  it("sets output low when both inputs are low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 0);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when one input is low", function() {
    and.setInputValue("a", 0);
    and.setInputValue("b", 1);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output low when other input is low", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 0);
    expect(and.getOutputValue("out")).to.eql(0);
  });

  it("sets output high when both inputs are high", function() {
    and.setInputValue("a", 1);
    and.setInputValue("b", 1);
    expect(and.getOutputValue("out")).to.eql(1);
  });
});
