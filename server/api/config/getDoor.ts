import fs from "fs";

export default (req, res) => {
  const config = JSON.parse(
    fs.readFileSync("./state/doorState.json").toString()
  );

  res.status(200).json(config);
};
