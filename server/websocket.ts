import getConfig from "./lib/getConfig";
const { io } = require("socket.io-client");
const logger = require("./lib/logger");
const axios = require("axios");
const moment = require("moment");

const initializeWebsocket = () => {
  const axiosInstance = axios.create({
    baseURL: global.ROOT_URL,
  });

  const config = getConfig();

  const socket = io(config.server_url || "ws://app.smartkotkot.net");

  socket.on("disconnect", (reason) => {
    logger.error(`[Websocket] Disconnected ...${reason}`);
  });

  socket.on("connect", () => {
    logger.info("[Websocket] Connected to the server");

    socket.emit("register-device", {
      moduleId: require("../state/module.json").moduleId,
      version: require("../package.json").version,
    });

    socket.on("command-device", async (data) => {
      logger.debug(
        `${moment().format("YYYY-mm-dd HH:mm:ss")} Command receive: ${
          data.commandId
        } - ${JSON.stringify(data.message)}`
      );

      let result;
      if (data.message.data)
        result = await axiosInstance.post(
          data.message.endPoint,
          data.message.data
        );
      else result = await axiosInstance.get(data.message.endPoint);

      socket.emit("response-device", {
        commandId: data.commandId,
        message: result.data,
      });
    });
  });

  return socket;
};

module.exports = initializeWebsocket;