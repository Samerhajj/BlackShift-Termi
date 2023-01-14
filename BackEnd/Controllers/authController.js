const User = require("../Models/userSchema");
const { validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

let refreshTokens = [];
//-------------------------------------------------------------------------------------------------------------------------------------
const register = async (req, res) => {
  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({error : errors.errors[0]});
  }
  // Extract the fields from the request body
  const {fullName, phone, language, field, email, password,favorite } = req.body.data;
  // const {fullName, phone, language, field, email, password,favorite,gender } = req.body.data;

    // const {fullName, phone, language, field, email, password,favorite } = req.body;

  // Check if a user with the same email already exists
  try {
    const foundUser = await User.findOne({ email: email });//somthing here 
    if (foundUser) {
      return res.send("Username Already exists");
    }
  } catch (err) {
    return res.status(500).json({err});
  }
  // Create a new user
  const newUser = new User({fullName, phone, language, field, email, password});
  // const newUser = new User({fullName, phone, language, field, email, password,gender});
  const payload = {id: newUser.id};
  const token = jwt.sign({email}, process.env.SECRET,{expiresIn: "1h"});
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

    const payload = { id: foundUser.email};
    
    // Send JWT access token
    const token = await jwt.sign({email}, process.env.SECRET,{expiresIn:'1h'});
    
    // Refresh Token
    const refreshToken = await jwt.sign( { email },process.env.SECRET,{expiresIn: "50m"});  
   
    // Set refersh token in refreshTokens array
    refreshTokens.push(refreshToken);
         
  
  res.header('x-auth-token', token);
  res.header('x-refresh-token', refreshToken);
  res.send({token,refreshToken});
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
//-------------------------------------------------------------------------------------------------------------------------------------

module.exports = {register,login,logout,tokenG,privateAccess};