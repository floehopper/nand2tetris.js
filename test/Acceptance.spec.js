var chai = require("chai");
var expect = chai.expect;

var child_process = require('child_process')

describe("Acceptance Test", function() {
  [ "Not" ].forEach(function(gate) {
    it("runs " + gate + ".tst", function() {
      var result = child_process.spawnSync("bin/HardwareSimulator.sh", ["projects/01/" + gate + ".tst"]);
      expect(result.status).to.equal(0, result.stderr.toString());
    });
  });
});
