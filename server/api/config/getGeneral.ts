import getConfig from "../../lib/getConfig";

export default (req, res) => {
  const config = getConfig();

  res.status(200).json(config);
};
