export default (req, res) => {
  // @ts-ignore
  const allCams = global.cameraList;

  const cameras = Object.keys(allCams).map((key) => {
    const oneCamera = allCams[key];

    return {
      id: key,
      config: oneCamera.config,
      lastRequest: oneCamera.lastRequest.toISOString(),
    };
  });
  res.status(200).json(cameras);
};
