const jwt = require("jsonwebtoken");
const User = require("../models/auth");

const verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log(req.headers.authorization);
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, "I am Lucifer", function (err, decoded) {
        if (err) {
          res.status(401).json({ message: err.message });
        } else {
          const user = User.findOne({ username: decoded.username });
          console.log(user)
          if (user) {
            req.user = user;
            next();
          } 
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = verifyToken;
