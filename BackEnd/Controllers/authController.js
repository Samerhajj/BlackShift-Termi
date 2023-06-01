const User = require("../Models/userSchema");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let refreshTokens = [];
//-------------------------------------------------------------------------------------------------------------------------------------
// Register function ,relevant path : "/register"
const register = async (req, res) => {
  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({error : errors.errors[0]});
  }
  // Extract the fields from the request body
  // const {fullName, phone, language, field, email, password,favorite } = req.body.data;
  const {fullName, phone, language, field, email, password,favorite,gender,status } = req.body.data;

  console.log("888888888888888888888888888")
  console.log(req.body)
    console.log("888888888888888888888888888")

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
  const newUser = new User({
    fullName, 
    phone, 
    language, 
    field, 
    email, 
    password,
    gender,
    status,// new
    isVerified: false, // add this field to the user document
    verificationToken: crypto.randomBytes(20).toString('hex'), // generate a verification token
    passwordResetToken: undefined,
    passwordResetExpires: undefined
  });
  const payload = { id: newUser._id, email: newUser.email };
  const token = jwt.sign(payload, process.env.SECRET,{expiresIn: "24h"});
  //req.session.jwt = token;
    // Set the authorization header 
  // res.set('Authorization', `Bearer ${token}`);
  // Save the user to the database
  try {
    await newUser.save();
  // send a verification email to the user
   const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: newUser.email,
      subject: 'Verify Your Account',
      html: `
        <h3>Hello ${fullName},</h3>
        <p>Thank you for registering for our app. To start using the app, please verify your account by clicking the link below:</p>
        <a href=" https://p7024.y2022prod.kinneret.cc/verify/${newUser.verificationToken}">Verify Account</a>
        <p> If you can't see the link, please paste this in your Web-Browser</p>
        <p>https://p7024.y2022prod.kinneret.cc/verify/${newUser.verificationToken}</p>
        <p>The verification link will expire in 24 hours.</p>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (err) { 
    console.log(err);
    console.log("error here");
  }

  // Return the token
  return res.json({ token });
};
//-------------------------------------------------------------------------------------------------------------------------------------
// Login function ,relevant path : "/login"
const login = async (req, res) => {
  //const { email, password } = req.body.loginData;
     const { email, password } = req.body;

  User.findOne({ email: { '$regex': email, $options: 'i' },isVerified:true },async function (err, foundUser) {
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
         
  
  foundUser.hashUserId();
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
   const user = await User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } });
    if (!user) {
      return res.status(404).json({ message: 'User with provided email not found.' });
    }
    console.log(user);
   // Generate a password reset token
    const token = await user.generatePasswordResetToken(user);
    await user.save();
    console.log("i am the user");
    console.log(user.passwordResetToken);
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Define the email options
   const mailOptions = {
  from: process.env.EMAIL_USERNAME,
  to: user.email,
  subject: 'Password reset request',
  html: `
    <div style="font-family: Arial, sans-serif;">
      <h1>Password Reset Request</h1>
      <p>Please click on the following link to reset your password:</p>
      <a href="https://p7024.y2022prod.kinneret.cc/reset-password/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
    </div>
  `
};

  
    // Send the email
   transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to send password reset email.' });
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
   const user = await User.findOne({
  passwordResetToken: hashedToken,
  passwordResetExpires: { $gt: Date.now() }

});
    if (!user) {
      return res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
    }
    console.log(user);
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();
    console.log("Changed password");
    return res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
}

//validate user
const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { $set: { isVerified: true } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ error: "Invalid token" });
    }

    if (user.isVerified) { // check if user is already verified
      return res.status(200).json({ message: "User is already verified", isVerified: true });
    }

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//-------------------------------------------------------------------------------------------------------------------------------------

module.exports = {register,login,logout,tokenG,privateAccess,forgotPassword,resetPassword,verifyUser};