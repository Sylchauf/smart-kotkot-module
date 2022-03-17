import fs from "fs";

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default (req, res) => {
  const config = req.body.json;

  if (IsJsonString(config)) {
    fs.writeFileSync("./state/lightState.json", config);

    res.status(200).send();
  } else {
    res.status(400).send();
  }
};
