// const User = require("../../Models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authToken = async (req, res, next) => {
  // Option 1
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer Token
  // Option 2
  console.log("hello");
  const token = req.header("token");
  // If token not found, send error message
  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "Token not found",
        },
      ],
    });
  }

  // Authenticate token
  try {
    // const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await jwt.verify(token, process.env.SECRET);
    
    console.log(user);
    console.log("hhihihih")
    console.log(user.email)
    req.user = user.email;
    console.log("before next")
    // res.send('Welcome to the protected route');
    next();
  } catch (error) {
    res.status(403).json({
      errors: [
        {
          msg: "Invalid token",
        },
      ],
    });
  }
};

module.exports = authToken;
