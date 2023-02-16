const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, "I am Lucifer", function (err, decoded) {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          User.findOne({ username: decoded.username }).then((result) => {
            if (result) {
              req.username = result.username;
              next();
            } else {
              res.status(404).json({ message: "Could not Find User" });
            }
          });
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = verifyToken;
