const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(400).send({ message: "No token provided" });
  }

  jwt.verify(token.split(" ")[1], "jwt_key", (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: error.message });
    }
    req.userId = decoded.id;
    next();
  });
};
