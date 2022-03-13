import fs from "fs";
import path from "path";

export default (req, res) => {
  // @ts-ignore
  const camera = global.cameraList[String(req.params.cameraId)];

  const image = fs.readFileSync(
    path.join(camera.config.save.path, String(req.params.name)),
    { encoding: "base64" }
  );

  if (image) {
    res.status(200).setHeader("Content-Type", "text/plain");

    res.send(image);
  } else res.status(404).send("");
};
