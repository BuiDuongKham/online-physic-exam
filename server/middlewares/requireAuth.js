const jwt = require("jsonwebtoken");

const config = process.env;

const requireAuth = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send("Unauthorized. A token is required for authentication");
  }
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "JWT_SECRET");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};

const isAdmin = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send("Unauthorized. A token is required for authentication");
  }
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "JWT_SECRET");
    if ((req.user = decoded && decoded.role === "admin")) {
      return next();
    }
  } catch (err) {
    return res.status(401).send("you are not a admin");
  }
};

const isHostOrAdmin = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send("Unauthorized. A token is required for authentication");
  }
  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "JWT_SECRET");
    if (
      (req.user =
        decoded && (decoded.role === "host" || decoded.role === "admin"))
    ) {
      return next();
    }
  } catch (err) {
    return res.status(401).send("you are not a admin");
  }
};

module.exports = { requireAuth, isAdmin, isHostOrAdmin };
