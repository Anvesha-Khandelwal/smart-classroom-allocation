const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function verifyToken(req, res, next) {
  const header = req.headers["authorization"];
  const token  = header && header.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};