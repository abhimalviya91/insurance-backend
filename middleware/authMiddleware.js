const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // 👇 browser se header aata hai lowercase me
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("❌ NO AUTH HEADER");
    return res.status(401).json("No token provided");
  }

  // Expected: "Bearer TOKEN"
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    console.log("❌ TOKEN FORMAT WRONG");
    return res.status(401).json("Token error");
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    console.log("❌ NOT BEARER");
    return res.status(401).json("Token malformatted");
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.admin = decoded;
    next();
  } catch (err) {
    console.log("❌ TOKEN INVALID");
    return res.status(401).json("Invalid token");
  }
};
