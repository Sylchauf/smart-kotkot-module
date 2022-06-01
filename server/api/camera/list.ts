export default async (req, res) => {
  // @ts-ignore
  const allCams = global.cameraList;

  const camerasPromise = Object.keys(allCams).map(async (key) => {
    const oneCamera = allCams[key];

    return {
      id: key,
      config: oneCamera.config,
      capabilities: await oneCamera.cameraInstance.getCapabilities(),
      streamUri: oneCamera.cameraInstance.streamUri,
      lastRequest: oneCamera.lastRequest.toISOString(),
    };
  });

  const cameras = await Promise.all(camerasPromise);

  res.status(200).json(cameras);
};
