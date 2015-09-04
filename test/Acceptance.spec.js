var chai = require("chai");
var expect = chai.expect;

var child_process = require('child_process')
var glob = require("glob")

describe("Acceptance Test", function() {
  glob.sync("projects/**/*.tst").forEach(function(tstFilePath) {
    it("runs " + tstFilePath, function() {
      var result = child_process.spawnSync("bin/HardwareSimulator.sh", [tstFilePath]);
      expect(result.status).to.equal(0, result.stderr.toString());
    });
  });
});
