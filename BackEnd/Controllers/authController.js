const User = require("../Models/userSchema");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let refreshTokens = [];
//-------------------------------------------------------------------------------------------------------------------------------------
const register = async (req, res) => {
  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({error : errors.errors[0]});
  }
  // Extract the fields from the request body
  // const {fullName, phone, language, field, email, password,favorite } = req.body.data;
  const {fullName, phone, language, field, email, password,favorite,gender } = req.body.data;

    // const {fullName, phone, language, field, email, password,favorite } = req.body;

  // Check if a user with the same email already exists
  try {
    const foundUser = await User.findOne({ email: email });//somthing here 
    if (foundUser) {
      // return res.send("Username Already exists");
         return res.status(409).json("Email Already Exists");
    }
  } catch (err) {
    return res.status(500).json({err});
  }
  // Create a new user
  // const newUser = new User({fullName, phone, language, field, email, password});
  const newUser = new User({fullName, phone, language, field, email, password,gender});
  const payload = { id: newUser._id, email: newUser.email };
  const token = jwt.sign(payload, process.env.SECRET,{expiresIn: "24h"});
  //req.session.jwt = token;
    // Set the authorization header 
  // res.set('Authorization', `Bearer ${token}`);
  // Save the user to the database
  try {
    await newUser.save();
  } catch (err) {
    console.log(err);
    console.log("error here");
  }
  console.log(req.body);
  // Return the token
  return res.json({token});
};
//-------------------------------------------------------------------------------------------------------------------------------------
const login = async (req, res) => {
  //const { email, password } = req.body.loginData;
     const { email, password } = req.body;

  User.findOne({ email: { '$regex': email, $options: 'i' } },async function (err, foundUser) {
    if (err) {
      return res.status(500).json({ error: 'Error while checking for user' });
    } 
    if (!foundUser) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (foundUser.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const payload = { id: foundUser._id, email: foundUser.email };
    
    // Send JWT access token
    const token = await jwt.sign(payload, process.env.SECRET,{expiresIn:'24h'});
    
    // Refresh Token
    const refreshToken = await jwt.sign( { email },process.env.SECRET,{expiresIn: "50m"});  
   
    // Set refersh token in refreshTokens array
    refreshTokens.push(refreshToken);
         
  
  res.json({token, refreshToken});
//res.send({message:"logged in successfully"});
  });
};
//-------------------------------------------------------------------------------------------------------------------------------------
// Create new access token from refresh token
const tokenG = async (req, res) => {  
   // Get the x-refresh-token from the request header
  const refreshToken = req.header("x-refresh-token");

   // If the x-refresh-token is not provided, return an error
  if (!refreshToken) {
    return res.status(401).send({ msg: 'No x-refresh-token provided' });
  }
  
  //verify the refresh token and decode its payload
  try{
    const decoded=jwt.verify(refreshToken, process.env.SECRET);
    //check if refresh token is in-memory store
    if(!refreshToken.includes(refreshToken)){
        return res.status(401).send({ msg: 'Invalid x-refresh-token provided' });
    }
    
    //generate a new jwt and refresh token
    
    const token = jwt.sign({email:decoded.email}, process.env.SECRET,{
      expiresIn:'1h'});
      
       const newRefreshToken = jwt.sign({email:decoded.email}, process.env.SECRET,{
      expiresIn:'1d'});
      
      // Replace the old refresh token with the new one in the in-memory store
    refreshTokens[refreshTokens.indexOf(refreshToken)] = newRefreshToken;
    
    // Set the x-auth-token and x-refresh-token in the response header
    res.headers['x-auth-token'] = token;
res.headers['x-refresh-token'] = newRefreshToken;
 // Send the JWT and user data in the response
  res.send({token},"this is res");
} catch (err) {
  return res.status(401).send({ msg: 'Invalid x-refresh-token provided' });
}
};
//-------------------------------------------------------------------------------------------------------------------------------------
const logout = (req, res) => {

  const refreshToken = req.headers['x-refresh-token'];
  const token = req.headers['x-auth-token'];
  
  // If the x-refresh-token is not provided, return an error
  if (!token || !refreshToken) {
    return res.status(401).send({ msg: 'No x-auth-token or x-refresh-token provided' });
  }

  // Verify the refresh token and decode its payload
  try {
    //jwt.verify(refreshToken,  process.env.REFRESH_TOKEN_SECRET);
   const decodedRefreshToken = jwt.verify(refreshToken, process.env.SECRET);

    // Check if the refresh token is in the in-memory store
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(401).send({ msg: 'Invalid x-refresh-token provided' });
      console.log("Invalid x-refresh-token provided");
    }
 // Check if the x-auth-token and x-refresh-token belong to the same user
    // if (decodedRefreshToken.email !== req.body.email) {
    //   return res.status(401).send(req.body.email);
    // }
    // Remove the refresh token from the in-memory store
    refreshTokens.splice(refreshTokens.indexOf(refreshToken), 1);
    res.header('x-auth-token', '');
  res.header('x-refresh-token', '');
  console.log("Logged out successfully")

  res.send('Logged out successfully');
} catch (err) {
  return res.status(401).send({ msg: 'Invalid x-refresh-token provided' });
}
};
//-------------------------------------------------------------------------------------------------------------------------------------
const privateAccess = async(req,res) =>{
  // --> Here we reach the private fields for our customers
    try{
        const resPrivate = await User.findOne({email:req.user});
        console.log(resPrivate)
        res.send(resPrivate);
    }
    catch(err){
        console.log(err);
        res.send("error");
    }
}

const forgotPassword = async(req,res)=>{
  try{
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User with provided email not found.' });
    }
    console.log(user);
   // Generate a password reset token
    const token = await user.generatePasswordResetToken(user);

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'termishift@gmail.com',
        pass: 'cdhzxscoempowrwy'
      }
    });

    // Define the email options
    const mailOptions = {
      from: 'termishift@gmail.com',
      to: user.email,
      subject: 'Password reset request',
      text: `Please click on the following link to reset your password: http://dir.y2022.kinneret.cc:7024/reset-password/${token}`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
      } else {
        console.log(`Email sent: ${info.response}`);
        return res.status(200).json({ message: 'Password reset email sent successfully.' });
      }
    });
  }
   catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    console.log("THis is my body");
      console.log(req.body);
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
console.log(hashedToken);
    const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
    
    if (!user) {
      return res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
    }
    console.log(user);
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------

module.exports = {register,login,logout,tokenG,privateAccess,forgotPassword,resetPassword};