import fs from "fs";

export default (req, res) => {
  // @ts-ignore
  const camera = global.cameraList[String(req.params.cameraId)];

  const files = fs.readdirSync(camera.config.save.path);

  if (files) res.status(200).json(files);
  else res.status(404).send("");
};
