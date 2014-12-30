var chai = require("chai");
var expect = chai.expect;

var HDLParser = require("../lib/HDLParser");

describe("HDLParser", function() {
  var parser;

  before(function() {
    parser = new HDLParser();
  });

  var parseHDL = function parseHDL(hdl) {
    return parser.parse(hdl);
  };

  var parsingHDLWith = function parsingHDLWith(hdl) {
    return parseHDL.bind(parseHDL, hdl);
  }

  it("parses minimally syntactically valid chip", function() {
    expect(parsingHDLWith("CHIP X{PARTS:}")).not.to.throw();
  });

  it("rejects chip definition if keyword and name are not separated with whitespace", function() {
    expect(parsingHDLWith("CHIPX{PARTS:}")).to.throw();
  });

  it("parses chip name containing uppercase & lowercase letters", function() {
    expect(parseHDL("CHIP ChipName{PARTS:}").name).to.equal("ChipName");
  });

  it("parses chip name containing digits", function() {
    expect(parseHDL("CHIP X123{PARTS:}").name).to.equal("X123");
  });

  it("rejects chip name if it starts with a digit", function() {
    expect(parsingHDLWith("CHIP 0X{PARTS:}")).to.throw();
  });

  it("parses chip with empty list of parts", function() {
    expect(parseHDL("CHIP X{PARTS:}").parts).to.be.empty;
  });

  it("ignores whitespace in chip definition", function() {
    expect(parsingHDLWith("CHIP X { PARTS: }")).not.to.throw();
  });

  it("ignores newlines in chip definition (Unix)", function() {
    expect(parsingHDLWith("CHIP X {\n  PARTS:\n}\n")).not.to.throw();
  });

  it("ignores carriage returns in chip definition (early Mac)", function() {
    expect(parsingHDLWith("CHIP X {\r  PARTS:\r}\r")).not.to.throw();
  });

  it("ignores CR/NL combinations in chip definition (DOS/Windows)", function() {
    expect(parsingHDLWith("CHIP X {\r\n  PARTS:\r\n}\r\n")).not.to.throw();
  });
});
