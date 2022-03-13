import { takePhoto } from "../../../../camera";

export default async (req, res) => {
  const result = await takePhoto(String(req.params.cameraId), true);

  if (result) res.status(200).send("OK");
  else res.status(500).send("");
};
