const User = require("../Models/userSchema");
const Suggest = require("../Models/suggestSchema");
var ObjectID = require('mongodb').ObjectID;

const favorites = async (req,res) =>{
  try{
    console.log("%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(req.body);
    console.log("%%%%%%%%%%%%%%%%%%%%%%%");

    const res_user =  await User.findOne({email:req.body.email});
    
    console.log("-------------");
    console.log(res_user);
    console.log("-------------");
    console.log(req.body);
    console.log("-------------");
    res.send(res_user.favorite);
  }
  catch(err){
    console.log(err);
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------
const deleteFavorite = async(req,res) =>{
  try{
      const response = await User.updateOne(
      { "_id": req.body.personId},
      { $pull: { favorite: req.body.card_id } })
      console.log("res From DEL FAV");
      console.log(response);
      console.log("res From DEL FAV");
      res.send(response);
  }
  catch(err){
    console.log(err);
  }
}
//-------------------------------------------------------------------------------------------------------------------------------------
const addFavorite = async (req,res) =>{
  try {
        const updateRes = await User.updateOne({ "_id": ObjectID(req.body.person_id)}, { $addToSet: { favorite: req.body.id } });
        res.send(updateRes.modifiedCount== 1); // --> update done succ
  }
  catch(err){
    console.log("hi from err");
    console.log(err);
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------
const suggestTerm = async (req,res) =>{
  const newSuggest = new Suggest({
  "categories":[],
  "shortDefinition":{},
  "lastEdited" : 25.22,
  "conceptName" : {"Samer" :{
                              "arabic" :"سامر",
                              "english" : "samer",
                              "hebrew" : "סאמר"}
  },
  "lastEditedDisplayable" : "29.12.2022",
  "longDefinition" : {},
  "suggestedBy" : "",
  "readMore" : "",
  "firestore_id" : "23480340918230981"
  });
  try{
    newSuggest.save();
    console.log(req.body);
    res.send("hello");
  }catch(err){
    res.send(err);
  }
};
//-------------------------------------------------------------------------------------------------------------------------------------

module.exports = {favorites, deleteFavorite, addFavorite, suggestTerm};


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




// {
//     "categories":{},
//     "shortDefinition":{},
//     "lastEdited" : 25.22,
//     "conceptName" : {"Samer" :{
//                                 "arabic" :"سامر",
//                                 "english" : "samer",
//                                 "hebrew" : "סאמר"}
//     },
//     "lastEditedDisplayable" : "29.12.2022",
//     "longDefinition" : {},
//     "suggestedBy" : {},
//     "readMore" : "",
//     "firestore_id" : "23480340918230981"


// }