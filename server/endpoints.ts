const setupEndpoint = (app) => {
  // Camera endpoint
  app.get("/api/camera/list", require("./api/camera/list").default);
  app.get(
    "/api/camera/images/:cameraId/last",
    require("./api/camera/images/[cameraId]/last").default
  );
  app.get(
    "/api/camera/images/:cameraId/list",
    require("./api/camera/images/[cameraId]/list").default
  );
  app.get(
    "/api/camera/images/:cameraId/take",
    require("./api/camera/images/[cameraId]/take").default
  );
  app.get(
    "/api/camera/images/:cameraId/:name",
    require("./api/camera/images/[cameraId]/[name]").default
  );

  // Door endpoint
  app.get("/api/door/down", require("./api/door/down").default);
  app.get("/api/door/up", require("./api/door/up").default);
  app.get("/api/door/status", require("./api/door/status").default);
  app.get(
    "/api/door/calibrate/down",
    require("./api/door/calibrate/down").default
  );
  app.get(
    "/api/door/calibrate/up",
    require("./api/door/calibrate/up").default
  );

  // Light endpoint
  app.get("/api/light/on", require("./api/light/on").default);
  app.get("/api/light/off", require("./api/light/off").default);
  app.get("/api/light/status", require("./api/light/status").default);

  // Temperature endpoint
  app.get(
    "/api/temperature/logs",
    require("./api/temperature/logs").default
  );
  app.get(
    "/api/temperature/status",
    require("./api/temperature/status").default
  );
};

export default setupEndpoint;
