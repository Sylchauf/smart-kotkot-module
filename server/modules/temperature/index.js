let temperatureInstance;

const TEMPerHUM = require("./TEMPerHUM");
import getConfig from "../../lib/getConfig";

const config = getConfig();

switch (config.temperature?.module) {
  case "TEMPerHUM":
    temperatureInstance = new TEMPerHUM();
    break;
}

exports.temperatureInstance = temperatureInstance;
