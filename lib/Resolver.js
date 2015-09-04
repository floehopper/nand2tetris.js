var fs = require("fs");
var path = require("path");

var HDLParser = require("../lib/HDLParser");
var AST = require("../lib/AST");
var FilePreProcessor = require("../lib/FilePreProcessor");

var Resolver = function(hdlDirectory) {
  this.hdlDirectory = hdlDirectory;
  this.parser = new HDLParser();
};

Resolver.parts = {};

Resolver.prototype.resolvePart = function(name) {
  definition = Resolver.parts[name];
  if (!definition) {
    var hdlPath = path.join(this.hdlDirectory, name + ".hdl");
    var hdl = new FilePreProcessor(hdlPath).toString();
    var ast = this.parser.parse(hdl, { AST: AST });
    var definition = ast.toDefinition();
    definition.resolveImplementation(this);
  }
  return definition;
}

Resolver.builtins = {};

Resolver.prototype.resolveBuiltin = function(name) {
  definition = Resolver.builtins[name];
  if (!definition) {
    try {
      definition = require("../lib/" + name);
    } catch(exception) {
      if (exception.code != "MODULE_NOT_FOUND") {
        throw exception;
      };
    };
  };
  return definition;
}

module.exports = Resolver;