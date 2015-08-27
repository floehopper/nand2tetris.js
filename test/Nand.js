var chai = require("chai");
var expect = chai.expect;

describe("Nand", function() {
  var nand;

  beforeEach(function() {
  });

  it("foo", function() {
    var fs = require("fs");
    var hdl = fs.readFileSync("./lib/Nand.hdl");
    var HDLParser = require("../lib/HDLParser");
    var parser = new HDLParser();
    var ast = parser.parse(hdl.toString(), { AST: require("../lib/AST") });

    var Model = require("../lib/Model");
    var model = new Model.Chip({});
    var visitor = {
      visit: function(node) {
        console.log(node);
      }
    };
    ast.accept(visitor);
    // console.log(model);
  })
  // it("sets output high when both inputs are low", function() {
  //   nand.setInputValue("a", 0);
  //   nand.setInputValue("b", 0);
  //   expect(nand.getOutputValue("out")).to.eql(1);
  // });
  //
  // it("sets output high when one input is low", function() {
  //   nand.setInputValue("a", 0);
  //   nand.setInputValue("b", 1);
  //   expect(nand.getOutputValue("out")).to.eql(1);
  // });
  //
  // it("sets output high when other input is low", function() {
  //   nand.setInputValue("a", 1);
  //   nand.setInputValue("b", 0);
  //   expect(nand.getOutputValue("out")).to.eql(1);
  // });
  //
  // it("sets output low when both inputs are high", function() {
  //   nand.setInputValue("a", 1);
  //   nand.setInputValue("b", 1);
  //   expect(nand.getOutputValue("out")).to.eql(0);
  // });
});
