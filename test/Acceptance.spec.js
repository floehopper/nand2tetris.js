var chai = require("chai");
var expect = chai.expect;

var child_process = require('child_process')
var glob = require("glob")

describe("Acceptance Test", function() {
  glob.sync("projects/**/*.tst").forEach(function(tstFilePath) {
    it("runs " + tstFilePath, function() {
      var result = child_process.spawnSync("bin/HardwareSimulator.sh", [tstFilePath]);
      var output = [result.stdout.toString(), result.stderr.toString()].join("\n\n");
      expect(result.status).to.equal(0, output);
    });
  });
});
