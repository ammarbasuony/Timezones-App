// Import JWT
import jwt from "jsonwebtoken";

// App Settings
import configurations from "../config/config.js";

const verifyToken = (req, res, next) => {
  const auth = req.header("Authorization");
  const getToken = auth ? auth.split(" ") : [];
  const token = getToken.pop();

  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  jwt.verify(token, configurations.jwt_token_key, (err, decodedToken) => {
    if (err)
      return res.status(401).json({ success: false, message: "Unauthorized" });
    req.user = decodedToken;
    next();
  });
};

export default verifyToken;
