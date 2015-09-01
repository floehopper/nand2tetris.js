var chai = require("chai");
var expect = chai.expect;

var TSTParser = require("../lib/TSTParser");

describe("TSTParser", function() {
  var parser;

  before(function() {
    parser = new TSTParser();
  });

  var parseTST = function parseTST(tst) {
    return parser.parse(tst);
  };

  describe("setup steps", function() {
    it("parses load command", function() {
      expect(parseTST("load example.hdl;").setup_step).to.contain(
        { command: "load", filename: "example.hdl" }
      );
    });

    it("parses output-file command", function() {
      expect(parseTST("output-file example.out;").setup_step).to.contain(
        { command: "output-file", filename: "example.out" }
      );
    });

    it("parses compare-to command", function() {
      expect(parseTST("compare-to example.cmp;").setup_step).to.contain(
        { command: "compare-to", filename: "example.cmp" }
      );
    });

    it("parses output-list command", function() {
      expect(parseTST("output-list in%B1.2.3 out%D4.5.6;").setup_step).to.contain({
        command: "output-list",
        variables: [
          { name: 'in', format: 'B', left_padding: 1, width: 2, right_padding: 3 },
          { name: 'out', format: 'D', left_padding: 4, width: 5, right_padding: 6 }
        ]
      });
    });

    it("parses multiple commands", function() {
      expect(parseTST("load example.hdl, output-file example.out;").setup_step).to.eql([
        { command: "load", filename: "example.hdl" },
        { command: "output-file", filename: "example.out" }
      ]);
    });
  });

  describe("simulation steps", function() {
    it("parses set command", function() {
      expect(parseTST("load example.hdl; set in 1;").simulation_steps[0]).to.contain(
        { command: "set", variable: "in", value: 1 }
      );
    });

    it("parses eval command", function() {
      expect(parseTST("load example.hdl; eval;").simulation_steps[0]).to.contain({
        command: "eval"
      });
    });

    it("parses multiple commands per step", function() {
      expect(parseTST("load example.hdl; set in 1, eval;").simulation_steps[0]).to.eql([
        { command: "set", variable: "in", value: 1 },
        { command: "eval" }
      ]);
    });

    it("parses multiple steps", function() {
      expect(parseTST("load example.hdl; set in 1; eval;").simulation_steps).to.eql([
        [ { command: "set", variable: "in", value: 1 } ],
        [ { command: "eval" } ]
      ]);
    });
  });
});
