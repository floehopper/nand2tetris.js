var AST = {};

AST.Chip = function(attributes) {
  this.name = attributes.name;
  this.statements = attributes.statements;
  // this.inputs = attributes.inputs;
  // this.outputs = attributes.outputs;
  // this.builtin = attributes.builtin;
  // this.parts = attributes.parts;
};

AST.Chip.prototype.accept = function(visitor) {
  visitor.visit(this);
  this.statements.forEach(function(statement) {
    statement.accept(visitor);
  });
};

AST.Inputs = function(attributes) {
  this.inputs = attributes.inputs;
};

AST.Inputs.prototype.accept = function(visitor) {
  console.log("Inputs");
  visitor.visit(this);
};

AST.Outputs = function(attributes) {
  this.outputs = attributes.outputs;
};

AST.Outputs.prototype.accept = function(visitor) {
  console.log("Outputs");
  visitor.visit(this);
};

AST.Parts = function(attributes) {
  this.parts = attributes.parts;
};

AST.Parts.prototype.accept = function(visitor) {
  console.log("Parts");
  visitor.visit(this);
};

AST.Builtin = function(attributes) {
  this.name = attributes.name;
};

AST.Builtin.prototype.accept = function(visitor) {
  console.log("Builtin");
  visitor.visit(this);
};

module.exports = AST;
