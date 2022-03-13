import express from "express";
import fs from "fs";
import * as process from "process";
import setupEndpoint from "./endpoints";
import logger from "./lib/logger";
const bodyParser = require("body-parser");

const { setupCronjobs } = require("./cron-tasks");
const { setupCleanOldPictures } = require("./cleanPictures");
const { initializeCameras } = require("./camera");
const { getTemperatureAndHumidity } = require("./temperature");
const initializeWebsocket = require("./websocket");

const app = express();
app.use(bodyParser.json());

global.PORT = process.env.PORT || 3000;
global.ROOT_URL = process.env.ROOT_URL || `http://127.0.0.1:${global.PORT}`;

// Declare all global variable used
global.cameraList = {};
global.cronJobs = [];

global.websocket = null;

setupEndpoint(app);

if (!fs.existsSync("./state/module.json")) {
  logger.error(
    "FATAL ERROR - module.json file is missing. Please read the documentation"
  );
  process.exit(1);
}

app.listen(Number(global.PORT), (err) => {
  if (err) throw err;
  console.log("> Ready on http://localhost:3000");

  global.websocket = initializeWebsocket();

  setupCronjobs();
  initializeCameras();
  getTemperatureAndHumidity();
  setupCleanOldPictures();
});
