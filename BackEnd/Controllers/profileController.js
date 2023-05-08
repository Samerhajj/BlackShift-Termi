const User = require("../Models/userSchema");
const jwt = require("jsonwebtoken");
const { gameSearchActivity } = require("./UserFolder/tracker/gameSearchActivity");
const { addLeaderboardPoints } = require("./leaderboardsController");

const changeProfile = async(req,res)=>{
   const updatedProfile = req.body;

  // find the user in the database using the email from the updated profile
  User.findOne({ email: updatedProfile.email }, (error, user) => {
    if (error) {
      // send a response to the client indicating that the update failed
      res.status(500).send({ message: 'Error updating profile: ' + error.message });
    } else {
      // update the user document with the new profile information
      user.fullName = updatedProfile.fullName;
      user.phone = updatedProfile.phone;
      user.field = updatedProfile.field;
      user.language = updatedProfile.language;
      user.gender = updatedProfile.gender;
      user.status=updatedProfile.status;

      // save the updated user document to the database
      user.save((error) => {
        if (error) {
          // send a response to the client indicating that the update failed
          res.status(500).send({ message: 'Error updating profile: ' + error.message });
        } else {
          // send a response to the client indicating that the update was successful
          res.status(200).send({ message: 'Profile updated successfully' });
        }
      });
    }
  });
    
}


const changePassword = async(req, res) => {
  // get the new password from the request body
  const newPassword = req.body.newPassword;

  // get the user's email from the request body
  const email = req.body.email;

  // find the user in the database
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      // handle error
      res.status(500).send(err);
    } else {
      // update the user's password
      user.password = newPassword;
      user.save((err, updatedUser) => {
        if (err) {
          // handle error
          res.status(500).send(err);
        } else {
          // send the updated user object back to the frontend
          res.send(updatedUser);
        }
      });
    }
  });
};


const updatePoints = async(req,res)=>{
  try{
    const token = req.headers['x-auth-token'];
    const activity = req.body.activity;
    const category = req.body.category;
    const gameName = req.body.gameName;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.id;
    // const userId=req.body._id;
    const points=req.body.points;
    
    //find the user
    const updatedUser = await User.findByIdAndUpdate(userId,{$inc: {points:
      points}},{new:true});
      
    gameSearchActivity(token, activity, category, gameName);
    addLeaderboardPoints(userId, category, gameName, points);
    
    res.status(200).json({
      success:true,
      message:"updated points successfully",
      updatedUser
    });
    
  }
  catch(error){
     res.status(500).json({
      success: false,
      message: 'Error updating points',
      error
    });
    
  }
};


const getGamePoints = async (req, res) => {
  const token = req.headers["x-auth-token"];
  console.log(token)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET);
    console.log(decoded);
     const user = await User.findById(decoded.id);
   
    // Your code to get game points here
    res.send({
      points: user.points,
      searchCounter:user.searchCounter,
      suggestConceptCounter:user.suggestConceptCounter
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};


// const getUserData = async (req, res) => {
//   const token = req.headers["x-auth-token"];
//   console.log(token)
//   let decoded;
//   try {
//     decoded = jwt.verify(token, process.env.SECRET);
//     console.log(decoded);
//     const user = await User.findById(decoded.id);
//     console.log(user);
   
//     // Your code to get game points here
//     res.send({
//       data:user
//     });
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: 'Invalid token'
//     });
//   }
// };

  
  
 
module.exports = { changeProfile,changePassword ,updatePoints,getGamePoints};


