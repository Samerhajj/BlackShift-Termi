// const User = require("../../Models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  const token = req.header("x-auth-token");

console.log(token);
console.log("This is the token");
  // If token not found, set error on request and call next middleware/route handler
  if (!token) {
    req.error = {
      message: "Token not found"
    };
    return next();
  }

  // Authenticate token
  try {
    const user = await jwt.verify(token, process.env.SECRET);
    req.user = user.email;
    next();
  } catch (error) {
    req.error = {
      message: "Invalid token"
    };
    return next();
  }
};

module.exports = authToken;
