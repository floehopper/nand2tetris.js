var fs = require("fs");
var path = require("path");

var HDLParser = require("../lib/HDLParser");
var AST = require("../lib/AST");
var stripCommentsAndBlankLines = require("../lib/stripCommentsAndBlankLines");

var Resolver = function(hdlDirectory) {
  this.hdlDirectory = hdlDirectory;
  this.parser = new HDLParser();
};

Resolver.parts = {};

Resolver.prototype.resolvePart = function(name) {
  definition = Resolver.parts[name];
  if (!definition) {
    var hdlFile;
    try {
      var hdlPath = path.join(this.hdlDirectory, name + ".hdl");
      hdlFile = fs.readFileSync(hdlPath);
    } catch(e) {
      if (e.code === 'ENOENT') {
        var hdlPath = path.join(__dirname, name + ".hdl");
        hdlFile = fs.readFileSync(hdlPath);
      } else {
        throw e;
      };
    };
    var hdl = stripCommentsAndBlankLines(hdlFile.toString());
    console.log(hdl);
    var ast = this.parser.parse(hdl, { AST: AST });
    var definition = ast.toDefinition();
    Resolver.parts[name] = definition;
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
      Resolver.builtins[name] = definition;
    } catch(exception) {
      if (exception.code != "MODULE_NOT_FOUND") {
        throw exception;
      };
    };
  };
  return definition;
}

module.exports = Resolver;