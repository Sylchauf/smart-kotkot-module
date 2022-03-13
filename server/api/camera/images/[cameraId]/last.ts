// @ts-ignore
import { getJpg } from "../../../../camera";

export default (req, res) => {
  const image = getJpg(String(req.params.cameraId));

  if (image) {
    res.status(200).setHeader("Content-Type", "text/plain");

    res.send(Buffer.from(image).toString("base64"));
  } else res.status(404).send("");
};
