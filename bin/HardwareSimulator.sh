#!/usr/bin/env node

var HardwareSimulator = require("../lib/HardwareSimulator");

var testFilePath = process.argv[2];

var simulator = new HardwareSimulator();
simulator.run(testFilePath);
