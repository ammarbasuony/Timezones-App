import jwt from "jsonwebtoken";

// App Settings
import configurations from "../config/config.js";

const createToken = (payload) => {
  const jwt_key = configurations.jwt_token_key;
  const expDate = 60 * 60 * 24 * 3;
  return jwt.sign(payload, jwt_key, {
    expiresIn: expDate,
  });
};

export default createToken;
