const getConfig = require("./lib/getConfig");
const { io } = require("socket.io-client");
const logger = require("./lib/logger");
const axios = require("axios");
const moment = require("moment");

const initializeWebsocket = () => {
  const axiosInstance = axios.create({
    baseURL: global.ROOT_URL,
  });

  const config = getConfig();

  const socket = io(config.server_url || "ws://localhost:3287");

  socket.on("disconnect", (reason) => {
    logger.error(`[Websocket] Disconnected ...${reason}`);
  });

  socket.on("connect", () => {
    logger.info("[Websocket] Connected to the server");

    socket.emit("register-device", {
      moduleId: config.moduleId,
      version: require("../package.json").version,
    });

    socket.on("command-device", async (data) => {
      logger.debug(
        `${moment().format("YYYY-mm-dd HH:mm:ss")} Command receive: ${
          data.commandId
        } - ${JSON.stringify(data.message)}`
      );
      const result = await axiosInstance.get(data.message.endPoint);

      socket.emit("response-device", {
        commandId: data.commandId,
        message: result.data,
      });
    });
  });

  return socket;
};

module.exports = initializeWebsocket;
