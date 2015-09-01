var fs = require("fs");
var HDLParser = require("../lib/HDLParser");
var AST = require("../lib/AST");

var Resolver = function() {
  this.parser = new HDLParser();
};

Resolver.parts = {};

Resolver.prototype.resolvePart = function(name) {
  definition = Resolver.parts[name];
  if (!definition) {
    var hdl = fs.readFileSync([__dirname, "..", "lib", name + ".hdl"].join("/"));
    var ast = this.parser.parse(hdl.toString(), { AST: AST });
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