const UserActivity2 = require("./../../../Models/activitySchema2");
const User = require("./../../../Models/userSchema");
const jwt = require("jsonwebtoken");


const gameSearchActivity = async (token, activity, category,gameName=null)=>{
  try {
    let decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
        await UserActivity2.create({
        gameName: gameName,
        currentScore:user.points,
        activity:activity,
        email: user.email,
        category:category,
        searchCounter:user.searchCounter
    });
  }
  catch (error) {
    console.log("Error with adding game search activity.");
  }    
};

module.exports = {gameSearchActivity};
