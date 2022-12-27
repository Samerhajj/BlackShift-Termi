const User = require("../Models/userSchema");
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let refreshTokens = [];
//-------------------------------------------------------------------------------------------------------------------------------------
const Register = async (req, res) => {
  // Check if there are validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({error : errors.errors[0]});
  }
  // Extract the fields from the request body
  const {fullName, phone, language, field, email, password,favorite } = req.body.data;
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
const Login = async (req, res) => {
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
{
//process.env.ACCESS_TOKEN_SECRET


//   // If token does not exist, send error message
//   if (!refreshTokens.includes(refreshToken)) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid refresh token",
//         },
//       ],
//     });
//   }

//   try {
//     const user = await jwt.verify(
//       refreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );
//     // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
//     const { email } = user;
//     const accessToken = await jwt.sign(
//       { email },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "10h" }
//     );
//     res.json({ accessToken });
//   } catch (error) {
//     res.status(403).json({
//       errors: [
//         {
//           msg: "Invalid token",
//         },
//       ],
//     });
//   }
// };
}
//-------------------------------------------------------------------------------------------------------------------------------------
const Logout = (req, res) => {

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
const Private = (req,res) =>{
  // --> Here we reach the private fields for our customers

     User.findOne({email:req.user},(err,foundUser)=>{
      console.log(foundUser)
       res.send(foundUser);
    })
    
  
// {
//   _id: new ObjectId("6399b9f613138008ea6fa9a1"),
//   fullName: 'mohamed',
//   phone: '0522907898',
//   language: 'Arabic',
//   field: 'English',
//   email: 'm7md@gmail.com',
//   password: '123456',
//   __v: 0
// }
    
  // res.send({msg:`hi to ${req.user}`})
  // res.send("hi from private area for the user")
}
//-------------------------------------------------------------------------------------------------------------------------------------
{
    // Set the x-auth-token and x-refresh-token in the response header to empty strings
//   const revokedTokens = [];
//   //const refreshToken = req.header("x-auth-token");
//   const token = req.headers['x-auth-token'];
// //if the x-auth-token not provided,return an error
//   if(!token){
//     return res.status(400).send({msg:"no x-auth-token provided"});
//   }
//   // Invalidate the token by adding it to a list of revoked tokens
//     revokedTokens.push(token);
//   // 
//   //set the x-auth-token in the response header to an empty string
//   //refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
// //return res.status(200).send({msg: "Sucessfully logged out"});
 
// res.header('x-auth-token', '').send('Sucessfully logged out');
// };
// Set the x-auth-token in the response header to an empty string
  //res.header('x-auth-token', '').send('Logged out successfully');

//send the refreshToken
}
{
// function verifyToken(req,res,next){
//   //get the x-auth-token from the request header
//   const token = req.headers['x-auth-token'];
  
//   //if the x-auth-token is not provided,return an error
//   if(!token){
//     return res.status(401).send({ msg: 'No x-auth-token provided' });
//   }
  
//   //verify the jwt and decode its payload
//   try{
//     const decoded=jwt.verify(token,process.env.SECRET);
//     req.body.email=decoded;
//     next();
//   }
//   catch(err){
//     console.log("WTF IS AHAPE");
//       return res.status(401).send({ msg: 'Invalid x-auth-token provided' });
//   }
// }



// const Authorize = async(req,res)=>{
//   // Get the token from the authorization header
//   const token = req.headers.authorization.split(' ')[1];
//   // Verify the token
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const user= await User.findOne({email:decoded.email});
  
//     res.send(`Hello, ${user.fullName}`);
//   } catch (err) {
//     res.status(401).send('Unauthorized');
//   }
// };
}
module.exports = {Register,Login,Logout,tokenG,Private}
{
 
  // const refreshToken = req.header("x-auth-token");

  // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  // res.sendStatus(204);











// const Authorize = async(req,res)=>{
//   // Get the token from the authorization header
//   const token = req.headers.authorization.split(' ')[1];
//   // Verify the token
//   try {
//     const decoded = jwt.verify(token, process.env.SECRET);
//     const user= await User.findOne({email:decoded.email});
  
//     res.send(`Hello, ${user.fullName}`);
//   } catch (err) {
//     res.status(401).send('Unauthorized');
//   }
// };









  


// const Login =  async(req, res) => {
  
//   console.log("hi from the get in the login.js");
//   //fk your loginData Undefined shit abo el sayed. i saw you jackses
//   const email = req.body.email;
//   const password = req.body.password;
//   User.findOne({ email: {'$regex' : email,$options:'i'} }, function (err, foundUser) {
    
    
//     if (err) {
//       console.log(err);
//     } else {
//       if (foundUser) {
        
//         const payload = {id:foundUser.id};
      
//         const token = jwt.sign(payload,process.env.SECRET);
//         //req.session.jwt = token;

//         res.json({token});
      
       
//           console.log(req.body);
//         //if there is a user exist
//         console.log("Print user : ",foundUser);
//         if (foundUser.password === password) {
//           //render the page that we are trying to acess
//         // res.write("Login successfully");
//           console.log("Login successfully");
//           //res.send();
//         } else {
//           console.log("Try Again Wrong Password");
//           res.send("Try Again Wrong Password");
//         }
//       } else {
//         console.log("no use found");
//         res.send("no use found");
//       }
//     }
//   });
// };


// User.findOne({ email: req.body.email }, function(err, doc) {// samer you may need to do try catch here to handle the throw
//     if (err) throw err;

//     if (doc) {
//       return res.status(400).send("Nickname already taken"); //or throw whatever you want
//     } 
//   });

  // We use this part of code to check if the user enter wrong values
  
//   if (!errors.isEmpty()) {
//     console.log("Error the user entered a wrong input");
//     console.log(errors.array());
//       return res.status(422).json({ errors: errors.array() });
//   }
  // End

  // Creating a new user and set the right values
// try{
//     const hashPassword = await bcrypt.hash(password,2);

//   const newUser = new User({
//     fullName,
//     phone,
//     language,
//     field,
//     email,
//     password: hashPassword,
//   });
//   console.log(newUser);
//   console.log(newUser.password);
//   // End

//   // Push the user to the database
  
// await newUser.save((err) => {
//     if (err) {
//       console.log(err);
//       console.log("error here");
//         // res.send("error");
//     }
//   });
//     console.log(req.body);
//     // res.send(req.body);
    
    
    
    
//     // res.status(201).json({message : "User signed up successfully!"});
// }catch(error){
//     if(!error.statusCode){
//         error.statusCode=500;
//     }
//     next(error);
   
// }



// end of Register

// const getReq = (req, res) => {
// res.status(200).send("helllllllllla");
//   console.log("get the job done");
// };
// res.status(201).json({message : "User signed up successfully!"});
// }catch(error){
//     if(!error.statusCode){
//         error.statusCode=500;
//     }
//     next(error);
// }

// const Register = async (req, res) => {
//   const errors = validationResult(req);
//   const {fullName,phone,language,field,email,password} = req.body;
//   if(!errors.isEmpty()){
//     return res.json({error : errors.errors[0]});
//   }

  
//   await User.findOne({ email: email }, function (err, foundUser) {
    
//     if (err) {
//     res.status(500).json({err})
     
     
//     } else {
//             if(foundUser){
//               console.log("this is the found user : ",foundUser);
//               res.send("Username Already exists");
               
//             }
//             else{// if user not exist ↓ you can register 
        
//                 const newUser = new User({fullName,phone,language,field,email,password});
//                 const payload = {id:newUser.id};
//                 const token =jwt.sign(payload,process.env.SECRET);
//                 req.session.jwt=token;
//                 res.json({token});
            
//             console.log(newUser);
//             console.log(newUser.password);

               
               
//           newUser.save((err) => {
//             if (err) {
//           console.log(err);
//           console.log("error here");
        
//     }
//   });
//     console.log(req.body);
    
//             }

//     }
     
//     }).clone().catch(function(err){ console.log(err)});


// module.exports = {Register,Login,Authorize}

}