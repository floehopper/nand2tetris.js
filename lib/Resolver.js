var fs = require("fs");
var HDLParser = require("../lib/HDLParser");
var AST = require("../lib/AST");

var Resolver = function() {
};

Resolver.prototype.resolvePart = function(name) {
  var hdl = fs.readFileSync([__dirname, "..", "lib", name + ".hdl"].join("/"));
  var parser = new HDLParser();
  var ast = parser.parse(hdl.toString(), { AST: AST });
  var definition = ast.toDefinition();
  definition.resolveImplementation(this);
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

module.exports = Resolver;