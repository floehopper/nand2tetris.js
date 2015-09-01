var chai = require("chai");
var expect = chai.expect;

var HDLParser = require("../lib/HDLParser");
var AST = require("../lib/AST");

describe("HDLParser", function() {
  var parser;

  before(function() {
    parser = new HDLParser();
  });

  var parseHDL = function parseHDL(hdl) {
    return parser.parse(hdl, { AST: AST });
  };

  var parsingHDLWith = function parsingHDLWith(hdl) {
    return parseHDL.bind(parseHDL, hdl);
  }

  describe("chip", function() {
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
      expect(parseHDL("CHIP X{PARTS:}").parts.parts).to.be.empty;
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

  describe("inputs", function() {
    it("parses chip with empty list of inputs", function() {
      expect(parseHDL("CHIP X{IN;PARTS:}").inputs.toDefinition()).to.be.empty;
    });

    it("parses chip with single input", function() {
      expect(parseHDL("CHIP X{IN y;PARTS:}").inputs.toDefinition()).to.eql(["y"]);
    });

    it("ignores whitespace after inputs terminator", function() {
      expect(parseHDL("CHIP X{IN y; PARTS:}").inputs.toDefinition()).to.eql(["y"]);
    });

    it("rejects inputs if keyword and pin name are not separated by whitespace", function() {
      expect(parsingHDLWith("CHIP X{INy;PARTS:}")).to.throw();
    });

    it("parses input pin name containing uppercase & lowercase letters", function() {
      expect(parseHDL("CHIP X{IN PinName;PARTS:}").inputs.toDefinition()).to.contain("PinName");
    });

    it("parses input pin name containing digits", function() {
      expect(parseHDL("CHIP X{IN y456;PARTS:}").inputs.toDefinition()).to.contain("y456");
    });

    it("rejects input pin name if it starts with a digit", function() {
      expect(parsingHDLWith("CHIP X{IN 9y;PARTS:}")).to.throw();
    });

    it("parses input pin name containing brackets", function() {
      expect(parseHDL("CHIP X{IN y[4];PARTS:}").inputs.toDefinition()).to.eql(["y[0]", "y[1]", "y[2]", "y[3]"]);
    });

    it("rejects input pin name if it starts with a bracket", function() {
      expect(parsingHDLWith("CHIP X{IN [8];PARTS:}")).to.throw();
    });

    it("parses chip with multiple inputs", function() {
      expect(parseHDL("CHIP X{IN a,b,c;PARTS:}").inputs.toDefinition()).to.eql(["a", "b", "c"]);
    });

    it("ignores whitespace around input pins", function() {
      expect(parseHDL("CHIP X{IN a , b , c ;PARTS:}").inputs.toDefinition()).to.eql(["a", "b", "c"]);
    });
  });

  describe("outputs", function() {
    it("parses chip with empty list of outputs", function() {
      expect(parseHDL("CHIP X{OUT;PARTS:}").outputs.toDefinition()).to.be.empty;
    });

    it("parses chip with single output", function() {
      expect(parseHDL("CHIP X{OUT y;PARTS:}").outputs.toDefinition()).to.eql(["y"]);
    });

    it("ignores whitespace after outputs terminator", function() {
      expect(parseHDL("CHIP X{OUT y; PARTS:}").outputs.toDefinition()).to.eql(["y"]);
    });

    it("rejects outputs if keyword and pin name are not separated by whitespace", function() {
      expect(parsingHDLWith("CHIP X{OUTy;PARTS:}")).to.throw();
    });

    it("parses output pin name containing uppercase & lowercase letters", function() {
      expect(parseHDL("CHIP X{OUT PinName;PARTS:}").outputs.toDefinition()).to.contain("PinName");
    });

    it("parses output pin name containing digits", function() {
      expect(parseHDL("CHIP X{OUT y456;PARTS:}").outputs.toDefinition()).to.contain("y456");
    });

    it("rejects output pin name if it starts with a digit", function() {
      expect(parsingHDLWith("CHIP X{OUT 9y;PARTS:}")).to.throw();
    });

    it("parses output pin name containing brackets", function() {
      expect(parseHDL("CHIP X{OUT y[4];PARTS:}").outputs.toDefinition()).to.eql(["y[0]", "y[1]", "y[2]", "y[3]"]);
    });

    it("rejects out put pin name if it starts with a bracket", function() {
      expect(parsingHDLWith("CHIP X{OUT [8];PARTS:}")).to.throw();
    });

    it("parses chip with multiple outputs", function() {
      expect(parseHDL("CHIP X{OUT a,b,c;PARTS:}").outputs.toDefinition()).to.eql(["a", "b", "c"]);
    });

    it("ignores whitespace around output pins", function() {
      expect(parseHDL("CHIP X{OUT a , b , c ;PARTS:}").outputs.toDefinition()).to.eql(["a", "b", "c"]);
    });
  });

  describe("parts", function() {
    it("parses chip with single part and single connection", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a=b);}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")])
      ]));
    });

    it("is null if chip has a built-in implementation", function() {
      var parts = parseHDL("CHIP X{BUILTIN Y;}").parts;
      expect(parts).to.be.null;
    });

    it("ignores whitespace around part parentheses", function() {
      var parts = parseHDL("CHIP X{PARTS: Y ( a=b ) ;}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")])
      ]));
    });

    it("ignores whitespace around part connection equals sign", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a = b);}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")])
      ]));
    });

    it("parses chip with single part and multiple connections", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a=b,c=d);}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b"), new AST.Connection("c", "d")])
      ]));
    });

    it("ignores whitespace around part connection separators", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a=b , c=d);}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b"), new AST.Connection("c", "d")])
      ]));
    });

    it("parses chip with multiple parts each with single connection", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a=b);Z(c=d);}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")]),
        new AST.Part("Z", [new AST.Connection("c", "d")])
      ]));
    });

    it("ignores whitespace around part terminators", function() {
      var parts = parseHDL("CHIP X{PARTS: Y(a=b) ; Z(c=d) ; }").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")]),
        new AST.Part("Z", [new AST.Connection("c", "d")])
      ]));
    });

    it("ignores newlines between parts (Unix)", function() {
      var parts = parseHDL("CHIP X{PARTS:\n  Y(a=b);\n  Z(c=d);\n}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")]),
        new AST.Part("Z", [new AST.Connection("c", "d")])
      ]));
    });

    it("ignores carriage returns between parts (early Mac)", function() {
      var parts = parseHDL("CHIP X{PARTS:\r  Y(a=b);\r  Z(c=d);\r}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")]),
        new AST.Part("Z", [new AST.Connection("c", "d")])
      ]));
    });

    it("ignores CR/NL combinations between parts (DOS/Windows)", function() {
      var parts = parseHDL("CHIP X{PARTS:\r\n  Y(a=b);\r\n  Z(c=d);\r\n}").parts;
      expect(parts).to.eql(new AST.Parts([
        new AST.Part("Y", [new AST.Connection("a", "b")]),
        new AST.Part("Z", [new AST.Connection("c", "d")])
      ]));
    });
  });

  describe("builtin", function() {
    it("parses chip with builtin", function() {
      var builtin = parseHDL("CHIP X{BUILTIN Y;}").builtin;
      expect(builtin).to.eql(new AST.Builtin("Y"));
    });

    it("is null if chip is implemented by parts", function() {
      var builtin = parseHDL("CHIP X{PARTS: Y(a=b);}").builtin;
      expect(builtin).to.be.null;
    });
  });
});
