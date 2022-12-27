const User = require("../Models/userSchema");
const { validationResult } = require('express-validator/check');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const Register = async (req, res) => {
  console.log(req.body);
  // const {fullName,phone,language,field,email,password} = req.body.data;
    const {fullName,phone,language,field,email,password} = req.body;


  
  // We use this part of code to check if the user enter wrong values
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("Error the user entered a wrong input");
    console.log(errors.array());
      return res.status(422).json({ errors: errors.array() });
  }
  // End
  
    // // Hash password before saving to database
    // const salt = await bcrypt.genSalt(10);
    // console.log("salt:", salt);
    // const hashedPassword = await bcrypt.hash(req.body.data.password, salt);
    // console.log("hashed password:", hashedPassword);
  
  
  // Creating a new user and set the right values
  // const newUser = new User({
  //   fullName: fullName,
  //   phone:phone,
  //   language:language,
  //   field:field,
  //   email: email,
  //   password: password,
  // });
  // End
  // --> replace ↓
    // Creating a new user and set the right values
  const newUser = new User({
    fullName: fullName,
    phone:phone,
    language:language,
    field:field,
    email: email,
    password: password,
    favorite : [],
  });
  // End

  // Push the user to the database
  
  newUser.save((err) => {
    if (err) {
      console.log(err);
      console.log("error here");
        res.send("error");
    }
  });
  // // Do not include sensitive information in JWT
  //   const accessToken = await JWT.sign(
  //     { fullName,phone,language,field,email },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     {
  //       expiresIn: "10s",
  //     }
  //   );

  //   res.json({
  //     accessToken,
  //   });
  
  
  
  
  
    console.log(req.body);
    res.send(req.body);
}

const getReq = (req, res) => {
res.status(200).send("helllllllllla");
  console.log("get the job done");
};

module.exports = {Register,getReq}