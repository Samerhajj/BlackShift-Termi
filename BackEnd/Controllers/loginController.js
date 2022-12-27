const User = require("../Models/userSchema");
const bcrypt = require("bcrypt");
const Login =  async(req, res) => {
  
  console.log("hi from the get in the login.js")
  const email = req.body.loginData.email;
  const password = req.body.loginData.password;
  User.findOne({ email: {'$regex' : email,$options:'i'} }, function (err, foundUser) {
    
    
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
          console.log(req.body);
        //if there is a user exist
        console.log("Print user : ",foundUser);
        if (foundUser.password === password) {
          //render the page that we are trying to acess
          res.send("Login successfully");
          console.log("Login successfully");
          
        } else {
          console.log("Try Again Wrong Password");
          res.send("Try Again Wrong Password");
        }
      } else {
        console.log("no use found");
        res.send("no use found");
      }
    }
  });
}

module.exports = {Login}

//  User.findOne({ email: email }, function (err, foundUser) {
