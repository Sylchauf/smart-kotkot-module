import LIGHT_STATE from "../../../constants/LIGHT_STATE";
import { switchLight } from "../../../engine/light";

export default (req, res) => {
  const result = switchLight(LIGHT_STATE.ON);

  res.status(result.status).json(result);
};
