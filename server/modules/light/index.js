let lightInstance;

const GCERelay = require("./GCERelay");
const GPIO = require("./GPIO");
import getConfig from "../../lib/getConfig";

const config = getConfig();

switch (config.light.module) {
  case "GCERelay":
    lightInstance = new GCERelay();
    break;
  case "GPIO":
    lightInstance = new GPIO();
    break;
}

exports.lightInstance = lightInstance;
