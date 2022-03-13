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

  console.log("req.body:", req.body);
  console.log("config", config);

  if (IsJsonString(config)) {
    fs.writeFileSync("./state/lightState.json", config);

    console.log("TEST");

    res.status(200).send();
  } else {
    res.status(400).send();
  }
};
