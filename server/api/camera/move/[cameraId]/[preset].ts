export default (req, res) => {
  // @ts-ignore
  const camera = global.cameraList[String(req.params.cameraId)];

  camera.cameraInstance.goToPreset(req.params.preset);

  res.status(200).send("");
};
